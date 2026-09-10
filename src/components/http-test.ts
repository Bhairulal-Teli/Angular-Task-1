import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GetRoutesHistory {
  id: string;
  route: string;
}

export interface PostRoutesHistory {
  route: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpTest {
  private routeHistoryUrl: string = 'http://localhost:3000/routeHistory';
  private http = inject(HttpClient);

  addRoute(data: PostRoutesHistory) {
    return this.http.post(this.routeHistoryUrl, data);
  }

  getRoutes() {
    return this.http.get<GetRoutesHistory[]>(this.routeHistoryUrl);
  }
}
