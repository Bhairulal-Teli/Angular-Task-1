import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpTest, GetRoutesHistory } from '../http-test';

@Component({
  selector: 'app-operation-navbar',
  imports: [RouterLink],
  templateUrl: './operation-navbar.html',
  styleUrl: './operation-navbar.css',
})
export class OperationNavbar {
  private httpService = inject(HttpTest);
  router = inject(Router);
  urlString = this.router.url;
  url = this.router.url.split('/').filter(Boolean);

  ngOnInit() {
    this.httpService.addRoute({ route: this.urlString }).subscribe((res) => {
      console.log(res);
    });
  }

  // send() {
  //   this.http?.post('http://localhost:3000/routeHistory',{route: this.urlString}).subscribe((res => {
  //     console.log(res);
  //   }))
  // }
}
