import { FormService } from './form.service';
import {DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { SearchService } from '../../../services/search.service';
import { ViewerInfo } from '../../../models/viewer.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  switchBtns: string = '';
  switchBtnsId!: number;
  error!: string;

  signupForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private formService: FormService,
    private searchService: SearchService
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

      this.http
        .post<ViewerInfo>(url, this.signupForm.value, { headers })
        .subscribe(
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
      this.error = 'Form is invalid. Please check the inputs.';
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
