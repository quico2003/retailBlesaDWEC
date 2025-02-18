import { Component, Input, OnInit } from '@angular/core';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-cuadro',
  imports: [RouterLink],
  templateUrl: './detalle-cuadro.component.html',
  styleUrl: './detalle-cuadro.component.css'
})
export class DetalleCuadroComponent implements OnInit {

  @Input('id') RecipeId?: string | null;
  public recipe?: RecipeCuadros | null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    if (this.RecipeId) {
      this.obtenerCuadro(this.RecipeId);
    }
  }


  private obtenerCuadro(id: string): void {
    this.supabaseService.getCuadroById(id).subscribe({
      next: cuadro => {
        this.recipe = cuadro;
        console.log('Cuadro encontrado:', this.recipe);
      },
      error: err => console.error('Error al obtener cuadro:', err)
    });
  }
}
