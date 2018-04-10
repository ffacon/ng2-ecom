import { TestBed, inject } from '@angular/core/testing';

import { DataContainerService } from './data-container.service';

describe('DataContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataContainerService]
    });
  });

  it('should be created', inject([DataContainerService], (service: DataContainerService) => {
    expect(service).toBeTruthy();
  }));
});
