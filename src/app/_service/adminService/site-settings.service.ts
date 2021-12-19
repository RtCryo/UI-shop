import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
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
    return this.http.get<SiteSettings>(`${environment.hostUrl}/settings`, {withCredentials: true});
  }

   updateSiteSettings(newSiteSettings: SiteSettings){
    return this.http.post<SiteSettings>(`${environment.hostUrl}/admin/updateSettings`, newSiteSettings, {withCredentials: true}).subscribe({
      next: () => {
        this.getSiteSettings().subscribe({
          next: (response) => {
            this.siteSettings$.next(response);
          }
        });
      },
      error: () => {
        this.getSiteSettings();
      }
    });
  }
}
