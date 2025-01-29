import { Component, Input, OnInit } from '@angular/core';
import { CuadroComponent } from '../../componentesmenu/cuadro/cuadro.component';
import { SupabaseService } from '../../service/supabase.service';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-borrar-cuadros',
  imports: [CuadroComponent, RouterLink],
  templateUrl: './borrar-cuadros.component.html',
  styleUrl: './borrar-cuadros.component.css'
})
export class BorrarCuadrosComponent implements OnInit {

  @Input('id') RecipeId?: string;
  public recipes: RecipeCuadros[] = [];

  constructor(private router: Router, private supabaseService: SupabaseService) {

  }

  ngOnInit(): void {
    this.obtenerCuadros();
    
    if (this.RecipeId) {
      this.supabaseService.deleteCuadro(this.RecipeId).subscribe({
        next: () => {
          console.log('cuadro borrado con exito');
          this.router.navigate(['adminDelete123']);
        }
      })
    }

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
