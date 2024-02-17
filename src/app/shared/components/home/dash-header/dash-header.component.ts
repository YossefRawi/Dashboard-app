import { Component} from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { FormService } from '../form/form.service';
import {TranslateService} from '@ngx-translate/core';
import { GlobalStateService } from '../../login/isLogged';
import { SearchService } from '../../../services/search.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss',
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
    this.dialogRef.open(FormComponent);
  }
}
