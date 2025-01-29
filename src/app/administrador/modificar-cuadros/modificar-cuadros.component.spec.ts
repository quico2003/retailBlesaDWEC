import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCuadrosComponent } from './modificar-cuadros.component';

describe('ModificarCuadrosComponent', () => {
  let component: ModificarCuadrosComponent;
  let fixture: ComponentFixture<ModificarCuadrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCuadrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCuadrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
