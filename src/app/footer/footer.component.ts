import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from '../_service/site-settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  siteSettingsService: SiteSettingsService;

  constructor(private settings: SiteSettingsService) {
    this.siteSettingsService=settings;
   }

  ngOnInit(): void {
  }

}
