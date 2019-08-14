import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subjectMap = new ReplaySubject<ParamMap>();
  private subject = new ReplaySubject<Params>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
    this.setParams(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subjectMap.asObservable();

  /** The mock params observable */
  readonly params = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subjectMap.next(convertToParamMap(params));
  }

  /** Set the paramMap observables's next value */
  setParams(params?: Params) {
    this.subject.next(params);
  }

}
