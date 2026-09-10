import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { Dictionary } from '../components/dictionary/dictionary';
import { Logs } from '../components/logs/logs';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'operation',
    pathMatch: 'full',
  },

  {
    path: 'operation',
    children: [
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: Home,
      },
      {
        path: 'subtract',
        component: Home,
      },
      {
        path: 'multiply',
        component: Home,
      },
    ],
  },

  {
    path: 'dictionary',
    children: [
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: Dictionary,
      },
      {
        path: 'subtract',
        component: Dictionary,
      },
      {
        path: 'multiply',
        component: Dictionary,
      },
      {
        path: 'key-value',
        component: Dictionary,
      },
    ],
  },
  {path: 'logs', component: Logs}
];
