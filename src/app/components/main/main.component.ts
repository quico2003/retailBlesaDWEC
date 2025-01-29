import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';
import { RecipeCuadros } from '../../Interface/recipeCuadros';

@Component({
  selector: 'app-main',
  imports: [RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  logg: boolean = false;
  recipecCuadros: RecipeCuadros[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {

    this.logg = this.supabaseService.loggedSubject.getValue();
    this.supabaseService.loggedSubject.subscribe(logged => this.logg = logged);
    this.supabaseService.isLogged();
    this.obtenerCuadrosAleatorios();


  }

  obtenerCuadrosAleatorios(): void {
    this.supabaseService.cuadrosRandom().subscribe({
      next: cuadros => {
        this.recipecCuadros = cuadros;

      },
      error: err => console.error(err)
    });

  }


}
