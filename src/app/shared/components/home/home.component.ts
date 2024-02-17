import { Component } from '@angular/core';
import { TranslateService, TranslateStore } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TranslateService, TranslateStore]
})
export class HomeComponent {
  rowDataForTable!: number;

  handleRowData(num: number) {
    console.log(num);
    this.rowDataForTable = num;
  }
}
