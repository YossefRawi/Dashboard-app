import { Component ,EventEmitter,Input,Output,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopupDataService } from '../pop-up/pop-up.service';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { AppComponent } from '../app.component';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dash-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss',
  providers: []
})


export class DashHeaderComponent {


  searchQueryName !: string;
  searchQueryPermission !: string;
  searchQueryJoined !: string;
  appComp : AppComponent = inject(AppComponent)

  

  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();

  sendData() {
    const dataToSend = this.searchQueryName;
    // Emit the event with the data
    this.sendDataToParent.emit(dataToSend);
  }



  logPermissions(Permissions : string){
    this.searchQueryPermission = Permissions;

    const dataToSend = this.searchQueryPermission;
    this.sendDataToParent.emit(dataToSend)

  }


  constructor(private dialogRef: MatDialog, private popupDataService: PopupDataService){
  }



  openDialog(text :string, id:number){
    this.popupDataService.setClickedButton(text, id);
    this.dialogRef.open(PopUpComponent);
  } 
}


