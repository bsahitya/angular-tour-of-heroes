import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  Renderer2,
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
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CovalentFlavoredMarkdownModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aiMlList', { static: true }) list!: ElementRef;

  // Holds the reference to the event listener for the 'selected' event
  private selectedEventListener!: (event: CustomEvent) => void;

  constructor(
    private _renderer2: Renderer2,
    private _router: Router,
    private _themeService: ThemeService
  ) {}

  /**
   * Sets up the event listener for the 'selected' event.
   */
  ngAfterViewInit() {
    this.selectedEventListener = this.onSelected.bind(this);
    this.list?.nativeElement.addEventListener(
      'selected',
      this.selectedEventListener
    );
    this._renderer2.addClass(
      document.querySelector('body'),
      this._themeService.getCurrentTheme()
    );
  }

  /**
   * Toggles the app theme.
   */
  toggleTheme() {
    const currentTheme = this._themeService.getCurrentTheme();
    this._themeService.toggleTheme();
    const newTheme = this._themeService.getCurrentTheme();
    this._renderer2.removeClass(document.querySelector('body'), currentTheme);
    this._renderer2.addClass(document.querySelector('body'), newTheme);
  }

  /**
   * Removes the event listener to avoid memory leaks.
   */
  ngOnDestroy(): void {
    if (this.list && this.selectedEventListener) {
      this.list.nativeElement.removeEventListener(
        'selected',
        this.selectedEventListener
      );
    }
  }

  /**
   * Handles the 'selected' event triggered by the list component.
   * Navigates to the route associated with the selected item.
   * @param event - The CustomEvent object containing the event details.
   */
  onSelected(event: CustomEvent) {
    const index = event.detail.index;
    const item = this.list.nativeElement.items[index];
    const route = item.value;
    this._router.navigate([route]);
  }
}
