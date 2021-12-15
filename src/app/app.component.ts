import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from './_service/adminService/site-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shop';

  constructor(private siteSettings: SiteSettingsService) {
    
  }
  ngOnInit(): void {
    this.siteSettings.getSiteSettings().subscribe({
      next: (response) => {
        this.siteSettings.siteSettings$.next(response);
      }
    })
  }
}
