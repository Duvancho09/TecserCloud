import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersCarsComponent } from './registers-cars.component';

describe('RegistersCarsComponent', () => {
  let component: RegistersCarsComponent;
  let fixture: ComponentFixture<RegistersCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistersCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistersCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
