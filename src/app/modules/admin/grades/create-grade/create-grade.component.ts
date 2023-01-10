import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GradeService } from '../grade.service';

@Component({
  selector: 'app-create-grade',
  templateUrl: './create-grade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGradeComponent implements OnInit {

  gradeCreateForm: UntypedFormGroup = null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreateGradeComponent>,
    private _gradeService: GradeService,
    private _form: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.initialGradeCreateForm();
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }

  private initialGradeCreateForm() {
    this.gradeCreateForm = this._form.group({
      name: [null, Validators.required],
      description: [null],
    });
  }

  createGrade() {
    if (this.gradeCreateForm.valid) {
      this._gradeService
        .createGrade(this.gradeCreateForm.value)
        .subscribe();
    }
  }

}
