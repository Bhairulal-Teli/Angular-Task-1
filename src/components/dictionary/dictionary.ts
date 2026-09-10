import { Component } from '@angular/core';
import { OperationNavbar } from '../operation-navbar/operation-navbar';

@Component({
  selector: 'app-dictionary',
  imports: [OperationNavbar],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css',
})
export class Dictionary {}
