import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SiteSettings } from '../../_model/site-settings';

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsService {

  public siteSettings$ = new Subject<SiteSettings>();

  constructor(private http: HttpClient) {
    this.getSiteSettings();
   }

  public getSiteSettings(){
    this.http.get<SiteSettings>(`${environment.hostUrl}/admin/settings`, {withCredentials: true}).subscribe({
      next: (response) => {
        this.siteSettings$.next(response);
      }
    });
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
