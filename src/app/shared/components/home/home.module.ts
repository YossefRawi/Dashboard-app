import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { TableComponent } from './table/table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { TranslateModule } from '@ngx-translate/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormService } from './form/form.service';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';

@NgModule({
  declarations: [
    FormComponent,
    HomeComponent,
    DashHeaderComponent,
    TableComponent,
    PaginatorComponent,
    HighlightDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    DatePipe,
    FormService,
    TranslateModule,
  ],
  exports: [
    FormComponent,
    HomeComponent,
    DashHeaderComponent,
    TableComponent,
    PaginatorComponent,
    HighlightDirective,
  ],
})
export class HomeModule {}
export { ReactiveFormsModule };

