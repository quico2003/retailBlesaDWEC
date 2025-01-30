import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CuadroComponent } from '../../componentesmenu/cuadro/cuadro.component';
import { SupabaseService } from '../../service/supabase.service';
import { RecipeCuadros } from '../../Interface/recipeCuadros';
import { Router, RouterLink } from '@angular/router';
import { FilterCuadroPipePipe } from "../../pipes/filter-cuadro-pipe.pipe";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-borrar-cuadros',
  imports: [ReactiveFormsModule, CuadroComponent, RouterLink, FilterCuadroPipePipe],
  templateUrl: './borrar-cuadros.component.html',
  styleUrl: './borrar-cuadros.component.css'
})
export class BorrarCuadrosComponent implements OnInit, OnDestroy {

  @Input('id') RecipeId?: string;
  public posts: RecipeCuadros[] = [];

  private serchSubscription?: Subscription;
  public serchValue: string = '';

  search: FormGroup;
  public recipes: RecipeCuadros[] = [];

  constructor(private router: Router, private supabaseService: SupabaseService, private formBuilder: FormBuilder, private searchService: SearchService) {
    this.search = this.formBuilder.group({
      searchCuadros: [''],
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
    
    if (this.RecipeId) {
      this.supabaseService.deleteCuadro(this.RecipeId).subscribe({
        next: () => {
          console.log('cuadro borrado con exito');
          this.router.navigate(['adminDelete123']);
        }
      })
    }

  }

  obtenerCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.posts = cuadros;
      },
      error: err => console.log(err)
    })
  }

  ngOnDestroy(): void {
    this.serchSubscription?.unsubscribe();
  }

}
