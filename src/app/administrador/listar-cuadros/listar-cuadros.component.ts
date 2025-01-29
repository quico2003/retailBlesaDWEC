import { Component, Input } from '@angular/core';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';
import { CuadroComponent } from '../../componentesmenu/cuadro/cuadro.component';

@Component({
  selector: 'app-listar-cuadros',
  imports: [RouterLink, CuadroComponent],
  templateUrl: './listar-cuadros.component.html',
  styleUrl: './listar-cuadros.component.css'
})
export class ListarCuadrosComponent {

  @Input('id') RecipeId?: string;
  public recipes: RecipeCuadros[] = [];

  constructor(private router: Router, private supabaseService: SupabaseService) {

  }

  ngOnInit(): void {
    this.obtenerCuadros();
  }

  obtenerCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.recipes = cuadros;
      },
      error: err => console.log(err)
    })
  }

}
