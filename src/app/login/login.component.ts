import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ViewerInfo } from '../viewer-info';
import { Router } from '@angular/router';
import { GlobalStateService } from './isLogged';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, ReactiveFormsModule, MatSelectModule,MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule, TranslateModule  ],
  providers: [DatePipe, HttpClient,HttpClientModule, LoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

@Injectable({ providedIn: 'root' })

export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  // isLogged : Boolean = false ;

  

  constructor(private formBuilder:FormBuilder, private http: HttpClient,private globalStateService: GlobalStateService){}
  userForm  = this.formBuilder.group({
    email:['', Validators.required],
  })
  router : Router = inject(Router);
  logFormData() {
      const url = 'http://localhost:3000/Users';
      if (!this.userForm.valid) return alert("Form is Invalid! please enter a valid Email.") 
      this.http.get(url).toPromise().then((data:any) =>{
         console.log(data)
         const isAdmin = data.some((obj:ViewerInfo) => obj.email === this.userForm.value.email && obj.permissions === 'Admin');
         if (isAdmin) {

           alert(`Success: ${this.userForm.value.email} has Admin permissions.`);
            this.globalStateService.setIsLogged(true)
           this.router.navigate(['/home'])

         } else {
           alert(`You aren't authorized. Only and ADMIN is authorized.`);
         }
        }
      
      ).catch(err =>  new Error(err));

  
    
    }
 

}
