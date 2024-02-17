import { Component, EventEmitter, Output} from '@angular/core';



@Component({
  selector: 'app-paginator',
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
