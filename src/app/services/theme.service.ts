import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light-theme');
  theme$: Observable<string> = this.themeSubject.asObservable();

  /**
   * @returns current theme
   */
  getCurrentTheme(): string {
    return this.themeSubject.value;
  }

  /**
   * Toggles the app theme.
   */
  toggleTheme() {
    const newTheme =
      this.getCurrentTheme() === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeSubject.next(newTheme);
  }
}
