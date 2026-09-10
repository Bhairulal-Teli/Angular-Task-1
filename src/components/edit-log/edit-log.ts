import { Component, computed, input, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-log',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-log.html',
  styleUrl: './edit-log.css',
})
export class EditLog {
  cancel = output<void>();
  route = input.required<string>();
  isFormValid= signal(false);

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

  isValid = computed(() => {
    this.isFormValid.set(this.log.status === 'VALID');
    return !this.isFormValid;
  })

}
