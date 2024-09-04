import { Routes } from '@angular/router';
import { GenericComponent } from './generic/generic.component';
import { NotebooksComponent } from './notebooks/notebooks.component';

export const routes: Routes = [
  {
    path: '',
    component: NotebooksComponent,
  },
  {
    path: 'generic',
    component: GenericComponent,
  },
  {
    path: 'notebooks',
    component: NotebooksComponent,
  },
];
