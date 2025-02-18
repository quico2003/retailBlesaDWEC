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
export class ModificarCuadrosComponent implements OnInit {
  
  @Input('id') RecipeId?: string | null;
  formulario!: FormGroup;
  public recipe: RecipeCuadros | null = null;
  
  constructor(
    private supabaseService: SupabaseService, 
    private formBuilder: FormBuilder, 
    private route: Router
  ) {}

  ngOnInit(): void {
    // Primero inicializamos el formulario
    this.formulario = this.formBuilder.group({
      nombreCuadro: ['', [Validators.required, Validators.minLength(4)]],
      precio: ['', [Validators.required, Validators.min(0.5)]],
      largo: ['', [Validators.required, Validators.min(0.5)]],
      alto: ['', [Validators.required, Validators.min(0.5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imagen: ['']
    });

    // Luego, si hay una ID, cargamos el cuadro a modificar
    if (this.RecipeId) {
      this.cuadroAModificar();
    }
  }

  actualizarCuadro(): void {
    if (this.formulario.invalid) {
      alert('Por favor, rellena todos los campos correctamente.');
      return;
    }

    if (!this.RecipeId) {
      alert('Error: No se encontró el ID del cuadro.');
      return;
    }

    this.supabaseService.updateCuadro(Number(this.RecipeId), this.formulario.value).subscribe({
      next: () => {
        alert('Cuadro actualizado con éxito');
        this.route.navigate(['/listaCuadros']); // Redirigir después de actualizar
      },
      error: (error) => {
        console.error('Error al actualizar cuadro:', error);
        alert('Hubo un error al actualizar el cuadro');
      }
    });
  }

  private cuadroAModificar(): void {
    if (!this.RecipeId) {
      console.error('Error: No hay ID para buscar el cuadro.');
      return;
    }

    this.supabaseService.getCuadroById(this.RecipeId).subscribe({
      next: cuadroModif => {
        if (cuadroModif) {
          this.recipe = cuadroModif;
          this.formulario.patchValue(this.recipe);
        } else {
          console.warn('No se encontró un cuadro con el ID proporcionado.');
        }
      },
      error: err => console.error('Error al obtener el cuadro:', err)
    });
  }
}

