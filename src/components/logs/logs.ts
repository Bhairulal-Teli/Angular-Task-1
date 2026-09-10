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
  isLogEditing = signal(false);
  private httpService = inject(HttpTest);

  logsData = signal<GetRoutesHistory[]>([]);
  editLogRoute = signal('');

  ngOnInit() {
    this.httpService.getRoutes().subscribe((data) => {
      this.logsData.set(data);
    });
  }

  onEditLog(data: string) {
    this.editLogRoute.set(data);
    this.isLogEditing.set(true);
  }

  onCancelEditLog() {
    this.isLogEditing.set(false);
  }
}
