import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDialogComponent } from './parte-dialog.component';

describe('ParteDialogComponent', () => {
  let component: ParteDialogComponent;
  let fixture: ComponentFixture<ParteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
