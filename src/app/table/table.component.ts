import {
  Component,
  Input,
  NgModule,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerInfo } from '../shared/viewer.model';
import { HighlightDirective } from '../shared/highlight.directive';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../form/form.component';
import { FormService } from '../form/form.service';
import { TranslateModule } from '@ngx-translate/core';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TranslateModule,
    HighlightDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() rowDataForTable!: number;
  inputValue: string = '';

  //Calls The async Function
  constructor(
    private dialogRef: MatDialog,
    private formService: FormService,
    public searchService: SearchService
  ) {
    //Subscribe to Input Subject
    this.searchService.inputValue$.subscribe((value) => {
      this.inputValue = value;
      this.searchService.filterResults(this.inputValue);
    });
    //Adds the data made by async to viewerinfolist
    this.searchService.viewerService
      .getAllViewerInfo(this.rowDataForTable)
      .then((viewerinfolist: ViewerInfo[]) => {
        this.searchService.viewerinfolist = viewerinfolist;
        this.searchService.filteredViewerList =
          this.searchService.viewerinfolist;
      });
  }

  //Function that runs on search change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowDataForTable']) {
      const newValue = changes['rowDataForTable'].currentValue;

      this.searchService.viewerService
        .getAllViewerInfo(newValue)
        .then((viewerinfolist: ViewerInfo[]) => {
          this.searchService.viewerinfolist = viewerinfolist;
          this.searchService.filteredViewerList =
            this.searchService.viewerinfolist;
        });
    }
  }

  setSortKey(key: keyof ViewerInfo): void {
    this.searchService.currentSortKey = key;
    // Trigger sorting when the sorting key is changed
    this.searchService.sortTable();
  }

  //DELETE ITEM
  isCheckboxChecked!: boolean;

  deleteUser(id: number) {
    this.searchService.onDeleteUser(id);
  }

  //EDIT ITEM
  openDialog(text: string, id: number) {
    this.formService.setClickedButton(text, id);
    this.dialogRef.open(PopUpComponent);
  }
}
