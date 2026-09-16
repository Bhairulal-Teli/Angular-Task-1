import { Component, inject, signal } from '@angular/core';
import { HttpTest, GetRoutesHistory } from '../http-test';
import { EditLog } from '../edit-log/edit-log';

@Component({
  selector: 'app-logs',
  imports: [EditLog],
  templateUrl: './logs.html',
  styleUrl: './logs.css',
})
export class Logs {
  constructor() {
    console.log('log constructor');
  }
  isLogEditing = signal(false);
  private httpService = inject(HttpTest);

  // logsData = signal<GetRoutesHistory[]>([]);
  logsData = this.httpService.logsDataService;

  editLogRoute = signal<GetRoutesHistory>({
    id: '',
    route: '',
  });

  ngOnInit() {
    this.httpService.getRoutes().subscribe((data) => {
      this.logsData.set(data);
    });
  }

  onEditLog(data: GetRoutesHistory) {
    // console.log("Error here: ", data);
    this.editLogRoute.set(data);
    this.isLogEditing.set(true);
  }

  onCancelEditLog() {
    this.isLogEditing.set(false);
  }
}
