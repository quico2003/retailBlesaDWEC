import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../service/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introducir-cuadros',
  imports: [ReactiveFormsModule],
  templateUrl: './introducir-cuadros.component.html',
  styleUrl: './introducir-cuadros.component.css'
})
export class IntroducirCuadrosComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private supabaseService: SupabaseService, private route: Router) {

  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombreCuadro: ['Nombre del cuadro', [Validators.required, Validators.minLength(4)]],
      precio: [3000, [Validators.required, Validators.min(0.5)]],
      largo: [2, [Validators.required, Validators.min(0.5)]],
      alto: [2, [Validators.required, Validators.min(0.5)]],
      description: ['Aqui va una pequeña descripcion del preducto...', [Validators.required, Validators.minLength(5)]],
      imagen: ['https://static.vecteezy.com/system/resources/previews/016/916/479/non_2x/placeholder-icon-design-free-vector.jpg']
    })
  }



  crearCuadro() {

    if (this.formulario.valid) {

      const cuadro = this.formulario.value;
      this.supabaseService.addCuadro(cuadro).subscribe({
        next: cuadro => console.log("Cuadro registrado con exito: ", cuadro),
        complete: () => this.route.navigate(['/inicioAdmin']),
        error: err => console.error(err)

      })

    } else {
      console.error("formulario no valido.")
    }

  }

}
