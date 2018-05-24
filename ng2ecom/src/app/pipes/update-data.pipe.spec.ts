import {ReflectiveInjector, Injector} from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { UpdateDataPipe } from './update-data.pipe';

import {DataContainerService} from '../services/data-container.service';

let parentInjector: Injector;
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

  it('Update data works', function() {
			let pipe = new UpdateDataPipe(dataContainerMock);
			let newContent: string = 'new field content';
			pipe.transform(newContent, []);

			expect(dataContainerMock.filteredBooks).toEqual(newContent);
		});
});
