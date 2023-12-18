import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers:[],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  
  @Output() sendRowDataToParent: EventEmitter<number> = new EventEmitter<number>();


  setRowNum(num : number){
    const dataToSend = num;
    // Emit the event with the data
    this.sendRowDataToParent.emit(dataToSend);
  }
}
