import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService{
  public searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  constructor() {
  }

}
