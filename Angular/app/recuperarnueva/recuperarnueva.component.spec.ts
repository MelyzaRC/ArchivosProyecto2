import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarnuevaComponent } from './recuperarnueva.component';

describe('RecuperarnuevaComponent', () => {
  let component: RecuperarnuevaComponent;
  let fixture: ComponentFixture<RecuperarnuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarnuevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarnuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
