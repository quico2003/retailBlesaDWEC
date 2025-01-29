import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCuadroComponent } from './detalle-cuadro.component';

describe('DetalleCuadroComponent', () => {
  let component: DetalleCuadroComponent;
  let fixture: ComponentFixture<DetalleCuadroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCuadroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCuadroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
