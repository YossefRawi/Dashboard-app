import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private isLogged: boolean = false;

  getIsLogged(): boolean {
    return this.isLogged;
  }

  setIsLogged(value: boolean): void {
    this.isLogged = value;
  }
}