import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SiteSettings } from '../../_model/site-settings';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  public siteSettings$ = new ReplaySubject<SiteSettings>(1);
  
  constructor(private http: HttpClient) {
  }

  public getSiteSettings(){
    return this.http.get<SiteSettings>(`${environment.hostUrl}/admin/settings`, {withCredentials: true});
  }

   updateSiteSettings(newSiteSettings: SiteSettings){
    return this.http.post<SiteSettings>(`${environment.hostUrl}/admin/updateSettings`, newSiteSettings, {withCredentials: true}).subscribe({
      next: () => {
        this.getSiteSettings();
      },
      error: () => {
        this.getSiteSettings();
      }
    });
  }
}
