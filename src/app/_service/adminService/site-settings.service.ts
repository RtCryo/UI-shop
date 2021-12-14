import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SiteSettings } from '../../_model/site-settings';

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

   updateSiteSettings(){
    return this.http.post<SiteSettings>(`${environment.hostUrl}/admin/updateSettings`, this.siteSettings, {withCredentials: true});
  }
}
