import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Operation {
  prevResult = signal<number>(0);
  // prevResult = 0;
}
