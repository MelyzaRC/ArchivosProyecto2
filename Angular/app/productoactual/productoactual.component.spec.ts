import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoactualComponent } from './productoactual.component';

describe('ProductoactualComponent', () => {
  let component: ProductoactualComponent;
  let fixture: ComponentFixture<ProductoactualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoactualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoactualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
