import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducirCuadrosComponent } from './introducir-cuadros.component';

describe('IntroducirCuadrosComponent', () => {
  let component: IntroducirCuadrosComponent;
  let fixture: ComponentFixture<IntroducirCuadrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroducirCuadrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroducirCuadrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
