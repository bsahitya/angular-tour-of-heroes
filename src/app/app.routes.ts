import { Routes } from '@angular/router';
import { GenericComponent } from './generic/generic.component';
import { NotebooksComponent } from './notebooks/notebooks.component';

export const routes: Routes = [
  {
    path: '',
    component: GenericComponent,
  },
  {
    path: 'notebooks',
    component: NotebooksComponent,
  },
];
