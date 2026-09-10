import { Component, computed, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-log',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-log.html',
  styleUrl: './edit-log.css',
})
export class EditLog {
  cancel = output<void>();
  route = input.required<string>();
  isFormValid= signal(true);

  log = new FormControl('', Validators.required);

  ngOnInit() {
    this.log.setValue(this.route());
  }

  onCancelEditLog() {
    this.cancel.emit();
  }

  onSubmit() {
    console.log(this.log.value);
    this.cancel.emit();
  }

  routeValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isValid = /^\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/.test(value);
      return isValid ? null : { invalidRoute: true };
    };
  }

}
