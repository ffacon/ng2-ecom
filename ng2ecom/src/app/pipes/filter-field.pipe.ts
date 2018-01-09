import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterField'
})
export class FilterFieldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
