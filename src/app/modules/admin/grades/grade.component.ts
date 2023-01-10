import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Grade } from 'app/model/grade.model';
import { Pagination } from 'app/model/pagination.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GradeService } from '../grades/grade.service';
import { CreateGradeComponent } from './create-grade/create-grade.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private _dialog: MatDialog,
    private _gradeSerivce: GradeService,
    private _changeDetectorRef: ChangeDetectorRef
) { }

grades$: Observable<Grade[]>;

pagination: Pagination;
flashMessage: 'success' | 'error' | null = null;
isLoading: boolean = false;
searchInputControl: UntypedFormControl = new UntypedFormControl();
search: string = "";
selectedGrade: Grade | null = null;
selectedGradeForm: UntypedFormGroup;
private _unsubscribeAll: Subject<any> = new Subject<any>();

ngOnInit() {
    this.loadGrades();
}

ngAfterViewInit(): void {

}

ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
}

openCreateGradeDialog() {
    this._dialog.open(CreateGradeComponent, {
        width: '720px',
    });
}

// PRIVATE METHOD
private loadGrades(): void {
    this._gradeSerivce.pagination$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((pagination: Pagination) => {
            this.pagination = pagination;
            this._changeDetectorRef.markForCheck();
        });
    this.grades$ = this._gradeSerivce.grades$;
}

}
