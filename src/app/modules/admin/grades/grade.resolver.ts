import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Grade } from 'app/model/grade.model';
import { Pagination } from 'app/model/pagination.model';
import { Observable, of } from 'rxjs';
import { GradeService } from './grade.service';

@Injectable({
  providedIn: 'root'
})
export class GradeResolver implements Resolve<any> {
   /**
     * Constructor
     */
   constructor(private _gradeService: GradeService) {
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
      pagination: Pagination; data: Grade[]
  }> {
      return this._gradeService.getGrades();
  }
}
