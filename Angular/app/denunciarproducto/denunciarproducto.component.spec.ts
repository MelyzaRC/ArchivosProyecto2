import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciarproductoComponent } from './denunciarproducto.component';

describe('DenunciarproductoComponent', () => {
  let component: DenunciarproductoComponent;
  let fixture: ComponentFixture<DenunciarproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciarproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
