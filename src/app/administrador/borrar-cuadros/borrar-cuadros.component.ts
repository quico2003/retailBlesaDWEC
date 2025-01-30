import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-borrar-cuadros',
  imports: [RouterLink],
  templateUrl: './borrar-cuadros.component.html',
  styleUrl: './borrar-cuadros.component.css'
})
export class BorrarCuadrosComponent {

  @Input('id') RecipeId?: string;
  
  constructor(private router: Router, private supabaseService: SupabaseService) { }


  borrarCuadro(){
    if (this.RecipeId) {
      this.supabaseService.deleteCuadro(this.RecipeId).subscribe({
        next: () => {
          this.router.navigate(['/listaCuadros']);
        }
      })
    }
  }

}
