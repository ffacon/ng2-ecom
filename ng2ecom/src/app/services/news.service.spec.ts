/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsService } from './news.service';

describe('NewsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsService]
    });
  });

  it('should ...', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));
});
