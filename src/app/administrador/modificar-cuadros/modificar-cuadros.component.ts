import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-cuadros',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-cuadros.component.html',
  styleUrl: './modificar-cuadros.component.css'
})
export class ModificarCuadrosComponent implements OnInit{
  
  @Input('id') RecipeId?: string;
  formulario!: FormGroup;
  public recipe: RecipeCuadros | undefined;
  

  constructor(private supabaseService:SupabaseService, private formBuilder:FormBuilder, private route:Router){ }
  
  
  ngOnInit(): void {
    this.cuadroAModificar();

    this.formulario = this.formBuilder.group({
      nombreCuadro: [this.recipe?.nombreCuadro || '', [Validators.required, Validators.minLength(4)]],
      precio: [this.recipe?.precio ?? '', [Validators.required, Validators.min(0.5)]],
      largo: [this.recipe?.largo ?? '', [Validators.required, Validators.min(0.5)]],
      alto: [this.recipe?.alto ?? '', [Validators.required, Validators.min(0.5)]],
      description: [this.recipe?.description || '', [Validators.required, Validators.minLength(5)]],
      imagen: [this.recipe?.imagen || '']
    })
    
  }

  actualizarCuadro(){
    if (this.formulario.invalid) {
      alert('Porfabor rellena todos los campos correctamente.')
      return;
    }

    this.supabaseService.updateCuadro(Number(this.RecipeId), this.formulario.value).subscribe({
      next: (response) => {
        alert('Cuadro actualizado con éxito');
        this.route.navigate(['/listaCuadros']); // Redirigir después de actualizar
      },
      error: (error) => {
        console.error('Error al actualizar cuadro:', error);
        alert('Hubo un error al actualizar el cuadro');
      }
    })
  }

  cuadroAModificar(){
    this.supabaseService.getCuadros(this.RecipeId).subscribe({
      next: cuadroModif => {
        this.recipe = cuadroModif[0];
        this.formulario.patchValue(this.recipe);
      },
      error: err => console.log(err)

    })

  }


  
  

}

