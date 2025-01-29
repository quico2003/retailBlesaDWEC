import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuadrosComponent } from './listar-cuadros.component';

describe('ListarCuadrosComponent', () => {
  let component: ListarCuadrosComponent;
  let fixture: ComponentFixture<ListarCuadrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCuadrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCuadrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
