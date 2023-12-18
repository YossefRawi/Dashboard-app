import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PopupDataService } from './pop-up.service';
import { TranslateModule } from '@ngx-translate/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}






@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, ReactiveFormsModule, MatSelectModule,MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule, TranslateModule],
  providers:[DatePipe],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent implements OnInit{
  switchBtns : string = '';
  switchBtnsId !: number;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();



  constructor(private formBuilder:FormBuilder, private http: HttpClient, private dateAdapter: DateAdapter<any>, private datePipe: DatePipe, private popupDataService: PopupDataService){}

  ngOnInit(): void {
    this.popupDataService.clickedButton$.subscribe((clickedButton) => {
      if (clickedButton?.button === 'ADD') {
        console.log('ADD')
        console.log(clickedButton.id)
        this.switchBtns = 'ADD'
        
      } else if (clickedButton?.button === 'EDIT') {
        console.log("EDIT")
        console.log(clickedButton.id)
        this.switchBtns = 'EDIT'
        this.switchBtnsId = clickedButton.id

      }
    });
  }



    userForm  = this.formBuilder.group({
      fullName:['', Validators.required],
      email:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      joined:['', Validators.required] ,
      permissions:['', Validators.required],
      checked:false,
      photo:['assets/images/Ellipse 2.svg']
    })



    saveForm(){
      if (this.userForm.valid) {
        const url = 'http://localhost:3000/Users';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.userForm.value.joined = this.datePipe.transform(this.userForm.value.joined, 'MMMM d, yyyy')
        this.http.post(url,this.userForm.value,{headers}).toPromise().then((data:any) => { console.log(data)}).catch(err =>  new Error(err));
  
          console.log('Request URL:', url);
          console.log('Request Headers:', headers);
          console.log('Request Payload:', this.userForm.value);
        console.log('Form submitted successfully!');
      } else {
        console.log('Form is invalid. Please check the inputs.');
      }
      
      }

      editForm(id:number){
        if (this.userForm.valid) {
          const url = `http://localhost:3000/Users/${id}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.userForm.value.joined = this.datePipe.transform(this.userForm.value.joined, 'MMMM d, yyyy')
          //Exclude Photo from EDIT
          const userData = { ...this.userForm.value };
          delete userData.photo; 

          this.http.patch(url,userData,{headers}).toPromise().then((data:any) => { console.log(data)}).catch(err =>  new Error(err));
          console.log('Form submitted successfully!');
        } else {
          console.log('Form is invalid. Please check the inputs.');
        }
      }

}
