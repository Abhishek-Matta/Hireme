import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProjectsComponent } from './browse-projects.component';

describe('BrowseProjectsComponent', () => {
  let component: BrowseProjectsComponent;
  let fixture: ComponentFixture<BrowseProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
