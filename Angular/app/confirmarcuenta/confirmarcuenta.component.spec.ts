import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarcuentaComponent } from './confirmarcuenta.component';

describe('ConfirmarcuentaComponent', () => {
  let component: ConfirmarcuentaComponent;
  let fixture: ComponentFixture<ConfirmarcuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarcuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
