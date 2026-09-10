import { Component } from '@angular/core';
import { OperationNavbar } from '../operation-navbar/operation-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [OperationNavbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
