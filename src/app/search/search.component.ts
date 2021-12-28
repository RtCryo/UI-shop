import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../_service/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = "";

  constructor(private searchService: SearchService, private route: Router) { }

  ngOnInit(): void {
   this.searchService.searchTerm$.subscribe((search) => {
     this.searchTerm = search;
   })
  }

  search(){
    if(this.searchTerm){
      this.route.navigateByUrl('/search/' + this.searchTerm);
    } else {
      this.route.navigateByUrl('/home');
    }
  }

}
