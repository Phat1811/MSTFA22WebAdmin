import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'app/model/pagination.model';
import { Subjects } from 'app/model/subject.model';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private _subjects: BehaviorSubject<Subjects[] | null> = new BehaviorSubject(null);
  private _subject: BehaviorSubject<Subjects | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<Pagination | null> =
    new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  get subjects$(): Observable<Subjects[]> {
    return this._subjects.asObservable();
  }

  get subject$(): Observable<Subjects> {
    return this._subject.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  getSubjects(
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
      .get<any>('/api/subjects', { params: params, observe: 'response' })
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
            this._subjects.next(empty.data);
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
            this._subjects.next(response.body);
          }
        })
      )
  }

  createSubject(subject: any): Observable<Subjects> {
    return this.subjects$.pipe(
      take(1),
      switchMap((subjects) =>
        this._http.post<Subjects>('/api/subjects', subject).pipe(
          map((newSubject) => {
            this._subjects.next([...subjects, newSubject]);
            return newSubject;
          })
        )
      )
    );
  }
}
