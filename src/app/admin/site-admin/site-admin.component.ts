import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SiteSettings } from 'src/app/_model/site-settings';
import { SiteSettingsService } from 'src/app/_service/adminService/site-settings.service';
import { UploadService } from 'src/app/_service/upload.service';

@Component({
  selector: 'app-site-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.css']
})
export class SiteAdminComponent implements OnInit {

  siteSettings!: SiteSettings;
  checked = false;
  selectedFile!: any;
  selectedLogo!: any;
  progress = 0;
  message: string = "";
  loading: boolean = true;
  settingForm!: FormGroup;

  constructor(private uploadService: UploadService, private formBuilder: FormBuilder, private readonly siteSettingService: SiteSettingsService) { 
  }

  ngOnInit(): void {
    this.siteSettingService.siteSettings$.subscribe((settings) => this.siteSettings = settings);
    this.siteSettingService.getSiteSettings().subscribe({
      next: (response) => {
        this.siteSettingService.siteSettings$.next(response);
        this.loading = false;
      }
    })
  }

  createNewForm(){
    this.settingForm = this.formBuilder.group({
      siteName: [this.siteSettings.siteName],
      email: [this.siteSettings.email],
      deliveryInfo: [this.siteSettings.deliveryInfo],
      info1: [this.siteSettings.info1],
      info2: [this.siteSettings.info2],
      info3: [this.siteSettings.info3],
  })
  }

  uploadNewLogo(){
    if( this.selectedLogo) { 
      let currentFile = this.selectedLogo.item(0)!;
      this.uploadService.uploadSiteFile(currentFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if(event.total) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
          } else if (event instanceof HttpResponse) {
            this.submit();
          }
        },
        error: () => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.loading = false;
        },
        complete: () => {
        }
      });
  }
  }

  uploadNewIng(){
    if( this.selectedFile) { 
      let currentFile = this.selectedFile.item(0)!;
      this.uploadService.uploadSiteFile(currentFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if(event.total) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
          } else if (event instanceof HttpResponse) {
            this.siteSettings.banner.push(event.body.message);
            this.siteSettingService.siteSettings$.next(this.siteSettings);
            this.submit();
          }
        },
        error: () => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.loading = false;
        },
        complete: () => {
        }
      });
  }
}

  selectFile(event: any){
    this.selectedFile = event.target.files;
  }

  selectLogo(event: any){
    this.selectedLogo = event.target.files;
  }

  deleteBanner(pic: string){}

  submit(){
    let newSiteSettings:SiteSettings = this.settingForm.value;
    newSiteSettings.id = this.siteSettings.id;
    newSiteSettings.imgLogoName = this.siteSettings.imgLogoName;
    newSiteSettings.banner = this.siteSettings.banner;
    this.siteSettingService.updateSiteSettings(newSiteSettings);
  }

  checkAllOptions() {
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("#chkBox");
    checkboxes.forEach((e) => {
      if(!this.checked) { 
        e.checked = true;
      }
      else {
        e.checked = false;
      }
    })
  }

  resetCheckAll(){
    let masterCheckBox = document.querySelector("#masterChkBox") as HTMLInputElement;
    masterCheckBox.checked = false;
    this.checked = false;
  }

}
