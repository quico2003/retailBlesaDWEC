import { Component, Input, OnInit } from '@angular/core';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-cuadro',
  imports: [RouterLink],
  templateUrl: './cuadro.component.html',
  styleUrl: './cuadro.component.css'
})
export class CuadroComponent implements OnInit{
  
  loggRol:boolean = false;
  logg: boolean = false;

  @Input({ required: true, }) recipe!: RecipeCuadros;

  constructor(private supaService:SupabaseService){ }


  ngOnInit(): void {
    this.logg = this.supaService.loggedSubject.getValue();
    this.supaService.loggedSubject.subscribe(logged => this.logg = logged);

    this.loggRol = this.supaService.loggedRol.getValue();
    this.supaService.loggedRol.subscribe(logged => this.loggRol = logged);

  }
}
