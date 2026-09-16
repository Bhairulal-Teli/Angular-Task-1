import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { OperationNavbar } from '../operation-navbar/operation-navbar';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from '../operation';
import { toSignal } from '@angular/core/rxjs-interop';

interface dataResolverOperation {
  operation: string;
}

@Component({
  selector: 'app-home',
  imports: [OperationNavbar, FormField],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  currentOperation = signal('add');

  operationModel = signal({
    firstNo: 0,
    secondNo: 0,
  });

  operationSymbol = computed(() => {
    if (this.currentOperation() === 'add') return '+';
    else if (this.currentOperation() === 'subtract') return '-';
    else return '*';
  });

  currentResult = computed(() => {
    if (this.currentOperation() === 'add') {
      return this.operationForm.firstNo().value() + this.operationForm.secondNo().value();
    } else if (this.currentOperation() === 'subtract') {
      return this.operationForm.firstNo().value() - this.operationForm.secondNo().value();
    } else {
      return this.operationForm.firstNo().value() * this.operationForm.secondNo().value();
    }
  });

  operationForm = form(this.operationModel);

  private currentRoute = inject(ActivatedRoute);
  private operationService = inject(Operation);
  private route = inject(Router);

  constructor() {
    effect(() => {
      if(this.currentResult() !== 0) {
        this.operationService.prevResult.set(this.currentResult());
      }
    });
  }

  ngOnInit() {
    // this.currentOperation.set(this.currentRoute.snapshot.url.map((data) => data.path)[0]);

    this.currentRoute.data.subscribe((val) => this.currentOperation.set((val as dataResolverOperation).operation));


    // this.currentOperation.set(String(this.currentRoute.data['operation']));
    // if (this.currentResult() !== 0) {
    //   this.operationService.prevResult.set(this.currentResult());
    // }

    if (this.operationService.prevResult() !== 0) {
      this.operationForm.firstNo().value.set(this.operationService.prevResult());
    }
  }
}
