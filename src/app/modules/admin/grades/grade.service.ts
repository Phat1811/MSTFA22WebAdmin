import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grade } from 'app/model/grade.model';
import { Pagination } from 'app/model/pagination.model';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private _grades: BehaviorSubject<Grade[] | null> = new BehaviorSubject(null);
  private _grade: BehaviorSubject<Grade | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<Pagination | null> =
    new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  get grades$(): Observable<Grade[]> {
    return this._grades.asObservable();
  }

  get grade$(): Observable<Grade> {
    return this._grade.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  getGrades(
    pageNumber: number = 0,
    pageSize: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = ''
  ): Observable<any> {
    var params = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sort: sort,
      order: order,
      search: search,
    };
    return this._http
      .get<any>('/api/grades', { params: params, observe: 'response' })
      .pipe(
          catchError((error) => {
            if (error.status === 404) {
              var empty = {
                  pagination: {
                      total: 0,
                      pageSize: pageSize,
                      pageNumber: pageNumber,
                  },
                  data: [],
              };
              this._grades.next(empty.data);
              this._pagination.next(empty.pagination);
              return of(empty);
          } else {
              throw error;
          }
          }),
          tap((response) => {
            if (response.body?.length > 0) {
                var tmp = {
                    total: 0,
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                };
                this._pagination.next(response.body.pagination ?? tmp);
                this._grades.next(response.body);
            }
        })
      )
  }

  createGrade(grade: any): Observable<Grade> {
    return this.grades$.pipe(
      take(1),
      switchMap((grades) =>
        this._http.post<Grade>('/api/grades', grade).pipe(
          map((newGrade) => {
            this._grades.next([...grades, newGrade]);
            return newGrade;
          })
        )
      )
    );
  }
}
