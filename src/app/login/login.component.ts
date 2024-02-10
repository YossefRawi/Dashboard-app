import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { ViewerInfo } from '../shared/viewer.model';
import { Router } from '@angular/router';
import { GlobalStateService } from './isLogged';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [DatePipe, HttpClient, HttpClientModule, LoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {

  adminForm!: FormGroup;


  constructor(
    private http: HttpClient,
    private globalStateService: GlobalStateService,
    private router : Router
  ) {}
  
  ngOnInit(): void {
    
    this.adminForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email])
  
    })
  }


  logFormData() {
    const url = 'http://localhost:3000/Users';
    if (!this.adminForm.valid)
      return alert('Form is Invalid! please enter a valid Email.');
    this.http
      .get(url)
      .toPromise()
      .then((data: any) => {
        console.log(data);
        const isAdmin = data.some(
          (obj: ViewerInfo) =>
            obj.email === this.adminForm.value.email &&
            obj.permissions === 'Admin'
        );
        if (isAdmin) {
          alert(`Success: ${this.adminForm.value.email} has Admin permissions.`);
          this.globalStateService.setIsLogged(true);
          this.router.navigate(['/home']);
        } else {
          alert(`You aren't authorized. Only and ADMIN is authorized.`);
        }
      })
      .catch((err) => new Error(err));
  }
}
