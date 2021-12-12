import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdminComponent } from './site-admin.component';

describe('SiteAdminComponent', () => {
  let component: SiteAdminComponent;
  let fixture: ComponentFixture<SiteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
