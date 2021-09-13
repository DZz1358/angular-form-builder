import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArraySchema, BooleanSchema, EnumSchema, NumberSchema, ObjectSchema, StringSchema } from './core/types'
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {

  // Do not modify this property
  @Input() schema!: ObjectSchema

  // Do not modify this property
  @Output() onSubmit = new EventEmitter<any>()

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.schema.properties)
    this.studentForm = this.getSchema(this.schema.properties);
    console.log(this.studentForm)
  }

  getFormControl(controlOptions: any) {
    if (controlOptions.required) {
      return new FormControl('', Validators.required)
    } else return new FormControl('');

  }

  getSchema(schemaProperties: any) {
    const formGroupContainer: any = {};


    for (let property of schemaProperties) {
      if (property.type == 'string' || property.type == 'number') {
        this.addInput(property, formGroupContainer);
      } else if (property.type == 'enum') {
        this.addEnum(property, formGroupContainer);
      } else if (property.type == 'object') {
        this.addObject(property, formGroupContainer);
      } else if (property.type == 'array') {
        this.addArray(property, formGroupContainer);
      } else if (property.type == 'boolean') {
        this.addBoolean(property, formGroupContainer);
      }
    }
    return this.fb.group(formGroupContainer)
  }

  addInput(inputDescription: StringSchema | NumberSchema, formGroupContainer: any) {
    formGroupContainer[inputDescription.name] = this.getFormControl(inputDescription);
  }

  addEnum(enumDescription: EnumSchema, formGroupContainer: any) {
    formGroupContainer[enumDescription.name] = this.getFormControl(enumDescription);
  }

  addObject(objDescription: ObjectSchema, formGroupContainer: any) {
    formGroupContainer[objDescription.name] = this.getSchema(objDescription.properties);
  }
  addArray(arrDescription: ArraySchema, formGroupContainer: any) {
    formGroupContainer[arrDescription.name] = this.getSchema(arrDescription.item.properties);
  }
  addBoolean(boolDescription: BooleanSchema, formGroupContainer: any) {
    formGroupContainer[boolDescription.name] = this.getFormControl(boolDescription);
  }

  addArrInput(item: any): void {
    let elem = item.item.properties.slice(0, 2)
    item.item.properties = [...item.item.properties, ...elem];
  }

  handleSubmit(event: Event) {
    this.onSubmit.emit(this.studentForm.value)
  }

}
