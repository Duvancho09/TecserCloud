import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPartsComponent } from './buy-parts.component';

describe('BuyPartsComponent', () => {
  let component: BuyPartsComponent;
  let fixture: ComponentFixture<BuyPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
