import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import '@covalent/components/badge';
import '@covalent/components/button';
import '@covalent/components/icon';
import '@covalent/components/icon-button-toggle';
import '@covalent/components/app-shell';
import '@covalent/components/list/list';
import '@covalent/components/list/nav-list-item';
import '@covalent/components/toolbar';
import '@covalent/components/textfield';
import '@covalent/components/typography';
import '@covalent/components/action-ribbon';
import '@covalent/components/checkbox';

import { interval, map, Observable, takeWhile } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aiMlList', { static: true }) list!: ElementRef;
  private selectedEventListener!: (event: CustomEvent) => void;
  constructor(private _router: Router) {}

  ngAfterViewInit() {
    this.selectedEventListener = this.onSelected.bind(this);
    this.list?.nativeElement.addEventListener(
      'selected',
      this.selectedEventListener
    );
  }

  onSelected(event: CustomEvent) {
    console.log(event);
    const index = event.detail.index;
    const item = this.list.nativeElement.items[index];
    const route = item.value;
    this._router.navigate([route]);
  }

  ngOnDestroy(): void {
    if (this.list && this.selectedEventListener) {
      this.list.nativeElement.removeEventListener(
        'selected',
        this.selectedEventListener
      );
    }
  }
}
