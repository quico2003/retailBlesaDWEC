import { Pipe, PipeTransform } from '@angular/core';
import { RecipeCuadros } from '../Interface/recipeCuadros';

@Pipe({
  name: 'filterCuadroPipe'
})
export class FilterCuadroPipePipe implements PipeTransform {

  transform(recipe: RecipeCuadros[], filterBy: string): RecipeCuadros[] {
    
    const filter = filterBy? filterBy.toLocaleLowerCase() : null;
    return filter ? recipe.filter(r => `${r.nombreCuadro} ${r.description}`.toLocaleLowerCase().includes(filter))
    : recipe;
  }

}
