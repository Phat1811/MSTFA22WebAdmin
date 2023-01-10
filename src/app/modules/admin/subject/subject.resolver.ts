import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Subjects } from 'app/model/subject.model';
import { Pagination } from 'app/model/pagination.model';
import { Observable, of } from 'rxjs';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectResolver implements Resolve<any> {
  /**
     * Constructor
     */
  constructor(private _subjectService: SubjectService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
    pagination: Pagination; data: Subjects[]
  }> {
    return this._subjectService.getSubjects();
  }
}
