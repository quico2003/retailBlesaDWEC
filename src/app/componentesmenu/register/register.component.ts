
import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../service/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuidler: FormBuilder, private supabaseService: SupabaseService, private router: Router) {

  }

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuidler.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formdata() {
    return this.formulario.controls;
  }


  crearCliente() {
    console.log(this.formulario.value);
    this.supabaseService
      .register(this.formulario.get("email")?.value, this.formulario.get("password")?.value)
      .subscribe({
        next: registredata => console.log(registredata),
        complete: () => { this.router.navigate(['/login']) },
        error: error => console.log(error)
      })
  }

}
