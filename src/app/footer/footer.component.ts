import { Component, OnInit } from '@angular/core';
import { SiteSettings } from '../_model/site-settings';
import { SiteSettingsService } from '../_service/adminService/site-settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  siteSettings!: SiteSettings;

  constructor(private readonly siteSettingService: SiteSettingsService) {
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
  }

}
