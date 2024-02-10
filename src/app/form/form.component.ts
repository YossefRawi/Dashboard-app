import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { FormService} from './form.service';
import { TranslateModule } from '@ngx-translate/core';
import { SearchService } from '../shared/search.service';
import { ViewerInfo } from '../shared/viewer.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [DatePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class PopUpComponent implements OnInit {
  switchBtns: string = '';
  switchBtnsId!: number;
  error!: string;

  signupForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private formService: FormService,
    private searchService: SearchService,

  ) {}

  ngOnInit(): void {
    this.formService.clickedButton$.subscribe((clickedButton) => {
      if (clickedButton?.button === 'ADD') {
        console.log(clickedButton.id);
        this.switchBtns = 'ADD';
        console.log(this.switchBtns);
      } else if (clickedButton?.button === 'EDIT') {
        console.log(clickedButton.id);
        this.switchBtns = 'EDIT';
        this.switchBtnsId = clickedButton.id;
        console.log(this.switchBtns);
      }
    });

    const editPerson = this.searchService.filteredViewerList.find(
      (obj) => obj.id === this.switchBtnsId
    );

    const editFullName = editPerson?.fullName;
    const editEmail = editPerson?.email;
    const editCity = editPerson?.city;
    const editState = editPerson?.state;
    const editjoined = editPerson?.joined;
    const editPermissions = editPerson?.permissions;
    const changeDatePattern = this.datePipe.transform(editjoined, 'M/dd/yyyy');

    this.signupForm = new FormGroup({
      fullName: new FormControl(editFullName, Validators.required),
      email: new FormControl(editEmail, [
        Validators.required,
        Validators.email,
      ]),
      city: new FormControl(editCity, Validators.required),
      state: new FormControl(editState, Validators.required),
      joined: new FormControl(changeDatePattern, Validators.required),
      permissions: new FormControl(editPermissions, Validators.required),
      checked: new FormControl(false),
      photo: new FormControl('assets/images/Ellipse 2.svg'),
    });
  }

  saveForm() {
    if (this.signupForm.valid) {
      const url = 'http://localhost:3000/Users';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.signupForm.value.joined = this.datePipe.transform(
        this.signupForm.value.joined,
        'MMMM d, yyyy'
      );

      this.http.post<ViewerInfo>(url, this.signupForm.value, { headers }).subscribe(
        (data: any) => {
          console.log(data);
          alert('Form submitted successfully!');
          location.reload();
        },
        (error) => {
          this.error = error.message;
        }
      );
      // .catch((err) => new Error(err));
    } else {
      alert('Form is invalid. Please check the inputs.');
    }
  }

  editForm(id: number) {
    if (this.signupForm.valid) {
      const url = `http://localhost:3000/Users/${id}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.signupForm.value.joined = this.datePipe.transform(
        this.signupForm.value.joined,
        'MMMM d, yyyy'
      );
      //Exclude Photo from EDIT
      const userData = { ...this.signupForm.value };
      delete userData.photo;

      this.http
        .patch(url, userData, { headers })
        .toPromise()
        .then((data: any) => {
          console.log(data);
          alert('Form submitted successfully!');
          location.reload();
        })
        .catch((err) => {
          new Error(err);
          this.error = err.message;
        });
    } else {
      alert('Form is invalid. Please check the inputs.');
    }
  }
}
