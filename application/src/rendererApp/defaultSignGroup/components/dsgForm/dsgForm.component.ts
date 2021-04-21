import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import ErrorInterface from "../../../shared/types/error.interface";
import DSG_InputInterface from "../../types/dsgInput.interface";


@Component({
  selector: 'tm-dsg-form',
  templateUrl: './dsgForm.component.html',
  styleUrls: ['./dsgForm.component.scss']
})
export default class DSG_FormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: DSG_InputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('error') errorProps!: ErrorInterface | null;

  @Output('formSubmit') formSubmitEvent = new EventEmitter<DSG_InputInterface>();

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
