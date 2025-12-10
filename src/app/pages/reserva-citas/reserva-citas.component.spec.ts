import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCitasComponent } from './reserva-citas.component';

describe('ReservaCitasComponent', () => {
  let component: ReservaCitasComponent;
  let fixture: ComponentFixture<ReservaCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
