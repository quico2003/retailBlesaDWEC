import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCuadrosComponent } from './borrar-cuadros.component';

describe('BorrarCuadrosComponent', () => {
  let component: BorrarCuadrosComponent;
  let fixture: ComponentFixture<BorrarCuadrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarCuadrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarCuadrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
