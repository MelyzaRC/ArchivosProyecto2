import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResbusquedaComponent } from './resbusqueda.component';

describe('ResbusquedaComponent', () => {
  let component: ResbusquedaComponent;
  let fixture: ComponentFixture<ResbusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResbusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResbusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
