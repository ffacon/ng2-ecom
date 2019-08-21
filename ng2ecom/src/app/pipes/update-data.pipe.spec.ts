import { UpdateDataPipe } from './update-data.pipe';
import { TestBed } from '@angular/core/testing';
import { DataContainerService } from '../services/data-container.service';

let dataContainerMock: any;

beforeEach(() => {

dataContainerMock = { filteredBooks: '' };
TestBed.configureTestingModule({
      providers: [
        {provide: DataContainerService, useClass: dataContainerMock}
     ]
   }).compileComponents();
 });

describe('UpdateDataPipe', () => {
  it('create an instance', () => {
    const pipe = new UpdateDataPipe(dataContainerMock);
    expect(pipe).toBeTruthy();
  });
});
