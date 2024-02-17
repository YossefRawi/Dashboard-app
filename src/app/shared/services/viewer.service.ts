import { Injectable } from '@angular/core';
import { ViewerInfo } from '../models/viewer.model';

@Injectable({
  providedIn: 'root',
})
export class ViewerService {
  constructor() {}
  async getAllViewerInfo(num = 10): Promise<ViewerInfo[]> {
    const data = await fetch(`http://localhost:3000/Users?_limit=${num}`);
    return (await data.json()) ?? [];
  }
}
