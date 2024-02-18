import { Injectable, inject } from '@angular/core';
import { ViewerInfo } from '../models/viewer.model';
import { ViewerService } from './viewer.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private inputValueSubject: Subject<string> = new Subject<string>();
  inputValue$ = this.inputValueSubject.asObservable();

  sendInputValue(value: string): void {
    this.inputValueSubject.next(value);
  }

  //////////
  viewerInfo!: ViewerInfo;
  viewerinfolist: ViewerInfo[] = [];
  viewerService: ViewerService = inject(ViewerService);
  filteredViewerList: ViewerInfo[] = [];

  //Filter through results BY SEARCHING
  filterResults(text: string) {
    if (!text) this.filteredViewerList = this.viewerinfolist;

    this.filteredViewerList = this.viewerinfolist.filter(
      (viewerInfo) =>
        viewerInfo?.fullName.toLowerCase().includes(text.toLowerCase()) ||
        viewerInfo?.email.toLowerCase().includes(text.toLowerCase()) ||
        viewerInfo?.permissions.toLowerCase().includes(text.toLowerCase()) ||
        viewerInfo?.city.toLowerCase().includes(text.toLowerCase()) ||
        viewerInfo?.state.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Toggle between ascending and descending order
  ascendingOrder = true;
  currentSortKey: keyof ViewerInfo = 'fullName';

  sortTable(): void {
    this.filteredViewerList.sort((a, b) => {
      const valueA = a[this.currentSortKey];
      const valueB = b[this.currentSortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const stringA = valueA.toUpperCase();
        const stringB = valueB.toUpperCase();

        return this.ascendingOrder
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.ascendingOrder ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    });
    this.ascendingOrder = !this.ascendingOrder;
  }

  onDeleteUser(id: number) {
    fetch(`http://localhost:3000/Users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        alert('Succesfully Deleted!')
        location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }
}
