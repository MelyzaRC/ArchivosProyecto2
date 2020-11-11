import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajenuevoComponent } from './mensajenuevo.component';

describe('MensajenuevoComponent', () => {
  let component: MensajenuevoComponent;
  let fixture: ComponentFixture<MensajenuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajenuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajenuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
