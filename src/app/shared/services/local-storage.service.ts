import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string,value:any)
  {
    localStorage.setItem(key,JSON.stringify(value));
  }

  getItem(key:string)
  {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  removeItem(key:string)
  {
    localStorage.removeItem(key);
  }
}
