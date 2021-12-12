import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SiteSettingsService } from 'src/app/_service/site-settings.service';

@Component({
  selector: 'app-site-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.css']
})
export class SiteAdminComponent implements OnInit {

  siteSettingsService: SiteSettingsService;
  siteForm!: FormGroup;
  checked = false;

  constructor(private siteService: SiteSettingsService) { 
    this.siteSettingsService = siteService;
  }

  ngOnInit(): void {
  }

  createNewForm(){
    this.siteForm = new FormGroup({
      siteName: new FormControl(),
      email: new FormControl(),
      deliveryInfo: new FormControl(),
      imgLogoName: new FormControl(),
      info1: new FormControl(),
      info2: new FormControl(),
      info3: new FormControl(),
      banner: new FormControl(),
    })
  }

  deleteBanner(pic: string){}

  submit(){
    this.siteSettingsService.updateSiteSettings(this.siteForm.value);
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
