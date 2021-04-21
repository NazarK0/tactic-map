import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { select, Store } from "@ngrx/store";
import { Observable } from 'rxjs';

import AppState from "../../../app.state";
import DSG_SignInterface from "../../../shared/types/dsgSign.interface";
import ErrorInterface from "../../../shared/types/error.interface";
import DSG_InputInterface from "../../types/dsgInput.interface";
import DSG_SignInputInterface from "../../types/dsgSignInput.interface";
import { DSG_DeleteImageAction } from "./store/actions/deleteImage.action";
import { DSG_UploadImageAction } from "./store/actions/uploadImage.action";
import { errorSelector, imageUrlSelector,isUploadingSelector } from "./store/dsgSignForm.selector";
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'tm-dsg-sign-form',
  templateUrl: './dsgSignForm.component.html',
  styleUrls: ['./dsgSignForm.component.scss']
})
export default class DSG_SignFormComponent implements OnInit, OnDestroy {
  @Input('initialValues') initialValuesProps!: DSG_SignInputInterface | null;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('error') errorProps!: ErrorInterface | null;
  @Input('mode') modeProps!: string;

  @Output('formSubmit') formSubmitEvent = new EventEmitter<DSG_SignInputInterface>();

  form: FormGroup = new FormGroup({});
  signUrlSubscription = new Subscription();
  signUrl!: string | null;
  isUploading$!: Observable<boolean>;
  isEditing!: boolean;
  isAdding!: boolean;
  error$!: Observable<ErrorInterface | null>;
  dsgId!: string | null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  initializeForm(): void {
    if (this.initialValuesProps) {
      const { title, description, sign } = this.initialValuesProps;

      this.form  = this.fb.group({
        title: new FormControl(title, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        description: new FormControl(description, [
          Validators.maxLength(500)
        ]),
        sign: new FormControl(sign)
      });
    }
  }

  initializeValues(): void {
    this.isUploading$ = this.store.pipe(select(isUploadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.dsgId = this.route.snapshot.paramMap.get('dsgId');
    this.isEditing = this.modeProps === 'edit';
    this.isAdding = this.modeProps === 'add';
  }

  initializeListeners(): void {
    this.signUrlSubscription.add(
      this.store.pipe(select(imageUrlSelector)).subscribe(sign => {
        this.signUrl = sign;
      })
    );
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    if (this.isAdding) {
      this.initializeListeners();
    } else if (this.isEditing) {
      this.signUrl = this.initialValuesProps?.sign  || null;
    }
  }

  ngOnDestroy(): void {
    this.signUrlSubscription.unsubscribe();
  }

  onUploadImage(): void {
    this.store.dispatch(DSG_UploadImageAction());
    // this.snackBar.open(`Зображення завантажено.`);
  }
  onDeleteImage(): void {
    this.store.dispatch(DSG_DeleteImageAction());
    this.snackBar.open(`Зображення видалено.`);
  }

  onSubmit(): void {
    this.form.patchValue({ sign: this.signUrl });
    this.formSubmitEvent.emit(this.form.value);
  }
}
