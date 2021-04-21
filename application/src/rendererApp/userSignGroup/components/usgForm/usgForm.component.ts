import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import ErrorInterface from "../../../shared/types/error.interface";
import USG_InputInterface from "../../types/usgInput.interface";


@Component({
  selector: 'tm-usg-form',
  templateUrl: './usgForm.component.html',
  styleUrls: ['./usgForm.component.scss']
})
export default class USG_FormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: USG_InputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('error') errorProps!: ErrorInterface | null;

  @Output('formSubmit') formSubmitEvent = new EventEmitter<USG_InputInterface>();

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) {}

  initializeForm(): void {
    const { title, description } = this.initialValuesProps;

    this.form  = this.fb.group({
      title: new FormControl(title, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl(description, [
        Validators.maxLength(500)
      ]),
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    this.formSubmitEvent.emit(this.form.value);
  }
}
