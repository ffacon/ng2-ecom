import { Pipe, PipeTransform } from '@angular/core';
import { DataContainerService } from '../services/data-container.service';

@Pipe({
  name: 'updateData'
})
export class UpdateDataPipe implements PipeTransform {

  constructor(public dataContainer: DataContainerService){}

  transform(value: any, args?: any): any {
    this.dataContainer.filteredBooks = value
    return value;
  }

}
