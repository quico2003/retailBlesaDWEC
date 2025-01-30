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

  @Input('id') RecipeId?: string;
  public recipe: RecipeCuadros | undefined;

  constructor(private supabaseService: SupabaseService) {

  }

  ngOnInit(): void {
    this.supabaseService.getCuadros(this.RecipeId).subscribe({
      next: cuadro => {
        this.recipe = cuadro[0];
      },
      error: err => console.log(err)
    })


  }


}
