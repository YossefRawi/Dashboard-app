import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PopUpComponent } from '../form/form.component';
import { FormService } from '../form/form.service';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { AppComponent } from '../app.component';
import { GlobalStateService } from '../login/isLogged';
import { SearchService } from '../shared/search.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dash-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss',
  providers: [],
})
export class DashHeaderComponent {
  searchQueryName!: string;

  // appComp: AppComponent = inject(AppComponent);


  constructor(
    private dialogRef: MatDialog,
    private formService: FormService,
    private globalStateService: GlobalStateService,
    private translate: TranslateService,
    private searchService: SearchService
  ) {}

  sendValue(value: string) {
    this.searchService.sendInputValue(value);
  }

 

  switchLang() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(newLang);
  }

  logout(): void {
    this.globalStateService.setLoggedOut();
  }

  openDialog(text: string, id: number) {
    this.formService.setClickedButton(text, id);
    this.dialogRef.open(PopUpComponent);
  }
}
