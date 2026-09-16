import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  constructor(router: Router) {
    this.getRoutes().subscribe((res) => {
      this.logsDataService.set(res);
      if(this.logsDataService().length > 0) {
        router
          .navigate(
            this.logsDataService()[this.logsDataService().length - 1].route.split('/').slice(1),
          )
          .then((r) => {
            console.log(r);
          });
      }
    });
  }

  logsDataService = signal<GetRoutesHistory[]>([]);

  private routeHistoryUrl: string = 'http://localhost:3000/routeHistory';
  private http = inject(HttpClient);

  addRoute(data: PostRoutesHistory) {
    return this.http.post(this.routeHistoryUrl, data);
  }

  getRoutes() {
    return this.http.get<GetRoutesHistory[]>(this.routeHistoryUrl);
  }

  getRouteForUpdateCheck(url: string) {
    return this.http.get(url);
  }

  updateRoute(id: string, newRouteVal: string) {
    let route = this.routeHistoryUrl + id;
    let newRoute = {
      id: id,
      route: newRouteVal,
    };
    // this.logsDataService.update((prevLogs) => {
    //   return prevLogs.map((log) =>
    //     log.id === newRoute.id ? { ...log, route: newRoute.route } : log,
    //   );
    // });
    return this.http.put(route, newRoute);
  }
}
