import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';
import { CuadroComponent } from '../../componentesmenu/cuadro/cuadro.component';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';
import { FilterCuadroPipePipe } from '../../pipes/filter-cuadro-pipe.pipe';

@Component({
  selector: 'app-listar-cuadros',
  imports: [CuadroComponent, ReactiveFormsModule, FilterCuadroPipePipe],
  templateUrl: './listar-cuadros.component.html',
  styleUrl: './listar-cuadros.component.css'
})
export class ListarCuadrosComponent implements OnInit, OnDestroy {


  public recipes: RecipeCuadros[] = [];

  private serchSubscription?: Subscription;
  public serchValue: string = '';
  search: FormGroup;

  constructor(private router: Router, private supabaseService: SupabaseService, private formBuilder: FormBuilder, private searchService: SearchService) {
    this.search = this.formBuilder.group({
      searchCuadros:[''],
    })
  }

  ngOnInit(): void {
    this.obtenerCuadros();

    this.search.get('searchCuadros')?.valueChanges.subscribe(this.searchService.searchSubject)
    this.serchSubscription = this.searchService.searchSubject.subscribe(
      searchValue => {
        this.serchValue = searchValue;
      }
    )
  }

  obtenerCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.recipes = cuadros;
      },
      error: err => console.log(err)
    })
  }

  ngOnDestroy(): void {
    this.serchSubscription?.unsubscribe();
  }

}
