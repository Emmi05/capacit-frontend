import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPaymentComponent } from './actualizar-payment.component';

describe('ActualizarPaymentComponent', () => {
  let component: ActualizarPaymentComponent;
  let fixture: ComponentFixture<ActualizarPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
