import { Gender } from './../../../../model/gender.model';
import {
    UntypedFormGroup,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { TutorService } from './../tutor.service';
import { Grade } from './../../../../model/grade.model';
import { Subject } from './../../../../model/subject.model';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-create-tutor',
    templateUrl: 'create-tutor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTutorComponent implements OnInit, AfterViewInit {
    subjects: Subject[] = [];
    grades: Grade[] = [];
    genders: Gender[] = [];
    tutorCreateForm: UntypedFormGroup = null;
    selectedGrades: any[] = [];
    selectedSubjects: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CreateTutorComponent>,
        private _tutorService: TutorService,
        private _form: UntypedFormBuilder
    ) {}

    ngOnInit() {
        this.getSubjectsLookup();
        this.getGradesLookup();
        this.getGendersLookup();
        this.initialTutorCreateForm();
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    changeGenderValue(event: any) {
        this.tutorCreateForm.controls['genderId'].setValue(event);
    }

    changeGradeValue(event: any) {
        this.selectedGrades = event;
        this.tutorCreateForm.controls['lectureGradeIds'].setValue(
            this.selectedGrades
        );
    }

    changeSubjectValue(event: any) {
        this.selectedSubjects = event;
        this.tutorCreateForm.controls['lectureSubjectIds'].setValue(
            this.selectedSubjects
        );
    }

    createTutor() {
        if (this.tutorCreateForm.valid) {
            this._tutorService
                .createTutor(this.tutorCreateForm.value)
                .subscribe();
        }
    }

    private initialTutorCreateForm() {
        this.tutorCreateForm = this._form.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            avatarUrl: [null],
            genderId: [null, Validators.required],
            bio: [null],
            price: [0, Validators.required],
            lectureGradeIds: [null],
            lectureSubjectIds: [null],
        });
    }

    private getGendersLookup() {
        this._tutorService.getGendersLookup().subscribe((result) => {
            this.genders = result.body;
        });
    }

    private getSubjectsLookup() {
        this._tutorService.getSubjectsLookup().subscribe((result) => {
            this.subjects = result.body;
        });
    }

    private getGradesLookup() {
        this._tutorService.getGradesLookup().subscribe((result) => {
            this.grades = result.body;
        });
    }
}
