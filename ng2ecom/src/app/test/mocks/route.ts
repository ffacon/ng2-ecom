import { ActivatedRoute, Params } from '@angular/router';
import { Observable, from } from 'rxjs';



export class MockActivatedRoute extends ActivatedRoute {
  params: Observable<Params>;

  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = from(new Promise(resolve => resolve(parameters)));
  }
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate');
}