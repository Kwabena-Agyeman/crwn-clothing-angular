import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHomePageComponent } from './shop-home-page.component';

describe('ShopHomePageComponent', () => {
  let component: ShopHomePageComponent;
  let fixture: ComponentFixture<ShopHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopHomePageComponent]
    });
    fixture = TestBed.createComponent(ShopHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
