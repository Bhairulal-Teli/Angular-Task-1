import { Component, computed, inject, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GetRoutesHistory, HttpTest } from '../http-test';
import { validateAsync } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-log',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-log.html',
  styleUrl: './edit-log.css',
})
export class EditLog {
  cancel = output<void>();
  route = input.required<GetRoutesHistory>();
  isFormValid = signal(true);

  private http = inject(HttpTest);
  private router = inject(Router);

  log = new FormControl('', [Validators.required, this.routeValidatorUrl()]);

  ngOnInit() {
    this.log.setValue(this.route().route);
  }

  onCancelEditLog() {
    this.cancel.emit();
  }

  onSubmit() {
    let path = `${this.log.value}`;
    console.log(path);
    let isRouteValid = this.router.config.some((route) => {
      console.log(route);
      return route.path === path;
    });

    if(!isRouteValid) {
      console.log('Invalid');
    } else {
      console.log('Valid');
    }

    // this.http.getRouteForUpdateCheck(`http://localhost:4200${this.log.value}`).subscribe({
    //   next: () => console.log('success'),
    //   error: (err) => console.log(err),
    // });

    this.http.updateRoute(`/${this.route().id}`, this.log.value!).subscribe((res) => {
      this.http.getRoutes().subscribe((res) => {
        this.http.logsDataService.set(res);
      });
    });

    this.cancel.emit();
  }

  routeValidatorUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const isValid = /^\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/.test(value);
      return isValid ? null : { invalidRoute: true };
    };
  }

  // routeValidatorData(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return null;
  //   }
  // }
}
