import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePaymentComponent } from './detalle-payment.component';

describe('DetallePaymentComponent', () => {
  let component: DetallePaymentComponent;
  let fixture: ComponentFixture<DetallePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
