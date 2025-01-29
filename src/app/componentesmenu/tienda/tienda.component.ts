import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { CuadroComponent } from '../cuadro/cuadro.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';
import { FilterCuadroPipePipe } from '../../pipes/filter-cuadro-pipe.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tienda',
  imports: [CommonModule, CuadroComponent, ReactiveFormsModule, FilterCuadroPipePipe],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit, OnDestroy{

  posts: any[] = [];
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
    this.getColeccionCuadros();

    this.search.get('searchCuadros')?.valueChanges.subscribe(this.searchService.searchSubject)
    this.serchSubscription = this.searchService.searchSubject.subscribe(
      searchValue => {
        this.serchValue = searchValue;
      }
    )
  }




  getColeccionCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.recipes = cuadros;
      },
      error: err => console.log(err),
      complete: () => console.log('Recived')
    })
  }



  ngOnDestroy(): void {
    this.serchSubscription?.unsubscribe();
  }

}
