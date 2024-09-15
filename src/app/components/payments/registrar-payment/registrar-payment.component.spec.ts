import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPaymentComponent } from './registrar-payment.component';

describe('RegistrarPaymentComponent', () => {
  let component: RegistrarPaymentComponent;
  let fixture: ComponentFixture<RegistrarPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
