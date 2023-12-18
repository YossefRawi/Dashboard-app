import { Component, Input, NgModule, inject, OnChanges,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerInfo } from '../viewer-info';
import { ViewerService } from '../viewer-service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopupDataService } from '../pop-up/pop-up.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})


export class TableComponent implements OnChanges {
  @Input() dataForTable = '';
  @Input() rowDataForTable!: number;
  

  viewerInfo!:ViewerInfo;
  viewerinfolist : ViewerInfo[] = [] ;
  viewerService: ViewerService = inject(ViewerService);
  filteredViewerList : ViewerInfo[] = [] ;


  //Calls The async Function
  constructor(private dialogRef: MatDialog, private popupDataService: PopupDataService) {
    
    //Adds the data made by async to viewerinfolist
    this.viewerService.getAllViewerInfo(this.rowDataForTable).then((viewerinfolist : ViewerInfo[]) => {
      this.viewerinfolist = viewerinfolist;
      this.filteredViewerList = this.viewerinfolist;
      
    })
    
  }

  //Function that runs on search change
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataForTable']){
      
      const newValue = changes['dataForTable'].currentValue;

      this.filterResults(newValue)

    }

    if(changes['rowDataForTable']){
      const newValue = changes['rowDataForTable'].currentValue;
      
      this.viewerService.getAllViewerInfo(newValue).then((viewerinfolist : ViewerInfo[]) => {
        this.viewerinfolist = viewerinfolist;
        this.filteredViewerList = this.viewerinfolist;
        
      })

    }
  }

 

  //Filter through results BY SEARCHING
  filterResults(text: string){
    
    if(!text) this.filteredViewerList = this.viewerinfolist ;

    this.filteredViewerList = this.viewerinfolist.filter(viewerInfo => viewerInfo?.fullName.toLowerCase().includes(text.toLowerCase()) || viewerInfo?.email.toLowerCase().includes(text.toLowerCase()) || viewerInfo?.permissions.toLowerCase().includes(text.toLowerCase()) ||viewerInfo?.city.toLowerCase().includes(text.toLowerCase()) ||viewerInfo?.state.toLowerCase().includes(text.toLowerCase()));
  }
  

  // Toggle between ascending and descending order
  ascendingOrder = true;
  currentSortKey: keyof ViewerInfo = 'fullName';


  sortTable() : void{
    this.filteredViewerList.sort((a, b) => {
      const valueA = a[this.currentSortKey];
      const valueB = b[this.currentSortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const stringA = valueA.toUpperCase();
        const stringB = valueB.toUpperCase();

        return this.ascendingOrder ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.ascendingOrder ? valueA - valueB : valueB - valueA;
      } else {

        return 0;
      }
    });
    this.ascendingOrder = !this.ascendingOrder;
  }

  setSortKey(key: keyof ViewerInfo): void {
    this.currentSortKey = key;
    // Trigger sorting when the sorting key is changed
    this.sortTable();
  }



  //DELETE ITEM
  isCheckboxChecked !: boolean;

  deleteUser(id : Number){
    fetch(`http://localhost:3000/Users/${id}`, {
  method: 'DELETE',
  }).then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
  }).then(data => {
  console.log('Deleted:', data);
  location.reload()
  }).catch(error => {
  console.error('Error:', error);
  });
}


  //EDIT ITEM
  openDialog(text :string, id : number){
    this.popupDataService.setClickedButton(text,id);
    this.dialogRef.open(PopUpComponent);
  }




}
