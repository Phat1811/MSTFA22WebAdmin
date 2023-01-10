import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Pagination } from 'app/model/pagination.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SubjectService } from './subject.service';
import { Subjects } from 'app/model/subject.model';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _subjectSerivce: SubjectService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  subjects$: Observable<Subjects[]>;

  pagination: Pagination;
  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  search: string = "";
  selectedSubject: Subjects | null = null;
  selectedSubjectForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.loadSubjects();
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }

  openCreateSubjectDialog() {
    this._dialog.open(CreateSubjectComponent, {
        width: '720px',
    });
}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // PRIVATE METHOD
  private loadSubjects(): void {
    this._subjectSerivce.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: Pagination) => {
        this.pagination = pagination;
        this._changeDetectorRef.markForCheck();
      });
    this.subjects$ = this._subjectSerivce.subjects$;
  }
}
