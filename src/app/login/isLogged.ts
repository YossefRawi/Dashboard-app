import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  // router : Router = inject(Router)
  private readonly storageKey = 'isLogged';
  private  isLogged!: boolean;

  constructor(private router : Router) {
    if (typeof localStorage !== 'undefined') {
      this.isLogged = localStorage.getItem(this.storageKey) === 'true';
    } else {
      return
    }
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }

  setIsLogged(value: boolean): void {
    this.isLogged = value;
    localStorage.setItem(this.storageKey, String(value));
  }

  setLoggedOut(): void {
    this.isLogged = false;
    localStorage.removeItem(this.storageKey);
    this.router.navigate([''])
  }
}