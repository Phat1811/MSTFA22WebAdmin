import { CreateTutorComponent } from './create/create-tutor.component';
import { TutorService } from './tutor.service';
import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Tutor } from 'app/model/tutor.model';
import { Pagination } from 'app/model/pagination.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-tutor',
    templateUrl: 'tutor.component.html',
    styleUrls: ['tutor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private _dialog: MatDialog,
        private _tutorSerivce: TutorService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    tutors$: Observable<Tutor[]>;

    pagination: Pagination;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    search: string = '';
    selectedTutor: Tutor | null = null;
    selectedTutorForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    ngOnInit() {
        this.loadTutors();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openCreateTutorDialog() {
        this._dialog.open(CreateTutorComponent, {
            width: '720px',
        });
    }

    // PRIVATE METHOD
    private loadTutors(): void {
        this._tutorSerivce.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => {
                this.pagination = pagination;
                this._changeDetectorRef.markForCheck();
            });
        this.tutors$ = this._tutorSerivce.tutors$;
    }
}
