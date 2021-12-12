import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SiteSettings } from '../_model/site-settings';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  public siteSettings!: SiteSettings

  constructor(private http: HttpClient) {
    this.getSiteSettings();
   }

  public getSiteSettings(){
    this.http.get<SiteSettings>(`${environment.hostUrl}/admin/settings`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.siteSettings = response;
      }
    });
   }

   public updateSiteSettings(siteSettings: SiteSettings){
    this.http.get<SiteSettings>(`${environment.hostUrl}/admin/updateSettings`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.siteSettings = response;
      }
    });
   }
}
