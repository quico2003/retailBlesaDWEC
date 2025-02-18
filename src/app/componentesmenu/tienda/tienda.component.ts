import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { CuadroComponent } from '../cuadro/cuadro.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';
import { FilterCuadroPipePipe } from '../../pipes/filter-cuadro-pipe.pipe';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-tienda',
  imports: [CommonModule, CuadroComponent, ReactiveFormsModule, FilterCuadroPipePipe],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit, OnDestroy{

  
  private serchSubscription?: Subscription;
  public serchValue: string = '';

  search: FormGroup;
  public recipes: RecipeCuadros[] = [];

  constructor(private supabaseService: SupabaseService, private formBuilder: FormBuilder, private searchService: SearchService) {
    this.search = this.formBuilder.group({
      searchCuadros: [''],
    })
  }


  ngOnInit(): void {
    // Cargar todos los cuadros al iniciar
    this.getColeccionCuadros();
  
    // Escuchar cambios en la búsqueda
    this.serchSubscription = this.search.get('searchCuadros')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(searchTerm => this.supabaseService.getCuadros(searchTerm))
      )
      .subscribe(cuadros => {
        this.recipes = cuadros;
      });
  }
  
  // Método para obtener todos los cuadros sin filtro
  getColeccionCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.recipes = cuadros;
      },
      error: err => console.log(err),
    });
  }



  ngOnDestroy(): void {
    this.serchSubscription?.unsubscribe();
  }

}
