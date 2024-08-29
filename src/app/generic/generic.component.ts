import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@covalent/components/tab-bar';
import '@covalent/components/tab';
import '@covalent/components/button';
import '@covalent/components/checkbox';

@Component({
  selector: 'app-generic',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.scss',
})
export class GenericComponent {}
