import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateData'
})
export class UpdateDataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
