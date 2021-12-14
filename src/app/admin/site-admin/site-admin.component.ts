import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SiteSettingsService } from 'src/app/_service/adminService/site-settings.service';
import { UploadService } from 'src/app/_service/upload.service';

@Component({
  selector: 'app-site-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.css']
})
export class SiteAdminComponent implements OnInit {

  siteSettingsService: SiteSettingsService;
  checked = false;
  selectedFile!: any;
  progress = 0;
  message: string = "";
  loading: boolean = false;

  constructor(private siteService: SiteSettingsService, private uploadService: UploadService) { 
    this.siteSettingsService = siteService;
  }

  ngOnInit(): void {
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
            let t:string = event.body.message;
            this.siteSettingsService.siteSettings.banner.push(t);
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

  deleteBanner(pic: string){}

  submit(){
    this.siteSettingsService.updateSiteSettings().subscribe({
      next: () => {

      },
      error: (err) => {
        console.log(err);
      }
    })
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
