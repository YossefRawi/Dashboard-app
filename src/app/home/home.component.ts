import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashHeaderComponent } from '../dash-header/dash-header.component';
import { TableComponent } from '../table/table.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { LoginComponent } from '../login/login.component';
import { TranslateService, TranslateStore } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashHeaderComponent,TableComponent,CommonModule,PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[LoginComponent,TranslateService,TranslateStore]
})



export class HomeComponent {
  rowDataForTable !:number;
  dataForTable: any;


  handleDataFromChild(data: any) {
    // Handle the data received from the child
    console.log('Data received from child:', data);
    this.dataForTable = data;
  }

  handleRowData(num :number){
    console.log(num)
    this.rowDataForTable = num
  }

  
  constructor(private translate: TranslateService){}
  switchLang() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(newLang);
  }


}
