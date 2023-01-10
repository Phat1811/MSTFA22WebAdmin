import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSubjectComponent implements OnInit {

  subjectCreateForm: UntypedFormGroup = null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreateSubjectComponent>,
    private _subjectService: SubjectService,
    private _form: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.initialSubjectCreateForm();
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }

  private initialSubjectCreateForm() {
    this.subjectCreateForm = this._form.group({
      name: [null, Validators.required],
      description: [null],
    });
  }

  createSubject() {
    if (this.subjectCreateForm.valid) {
      this._subjectService
        .createSubject(this.subjectCreateForm.value)
        .subscribe();
    }
  }
}
