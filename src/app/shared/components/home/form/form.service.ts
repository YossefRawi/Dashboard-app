import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private clickedButtonSubject = new BehaviorSubject<{ button: string; id: number }| null>(null);
  clickedButton$ = this.clickedButtonSubject.asObservable();

  setClickedButton(button: string, id: number): void {
    this.clickedButtonSubject.next({button,id});
  }
}