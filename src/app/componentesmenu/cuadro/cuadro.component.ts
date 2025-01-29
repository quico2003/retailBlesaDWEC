import { Component, Input } from '@angular/core';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cuadro',
  imports: [RouterLink],
  templateUrl: './cuadro.component.html',
  styleUrl: './cuadro.component.css'
})
export class CuadroComponent {

  @Input({ required: true, }) recipe!: RecipeCuadros;
}
