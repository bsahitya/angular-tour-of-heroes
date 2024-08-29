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
import '@covalent/components/notebook-cell';
import '@covalent/components/typography';
import '@covalent/components/icon';
import '@covalent/components/icon-button';
import '@covalent/components/tree-list';
import '@covalent/components/tree-list-item';
import '@covalent/components/select';
import { NotebooksService } from './notebooks.service';
import { Cell } from '../models/cell';
import { take } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';

@Component({
  selector: 'app-notebooks',
  standalone: true,
  imports: [CommonModule, CovalentFlavoredMarkdownModule],
  providers: [NotebooksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notebooks.component.html',
  styleUrl: './notebooks.component.scss',
})
export class NotebooksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabBar', { static: true }) list!: ElementRef;
  private selectedEventListener!: (event: CustomEvent) => void;

  selectedTabIndex = 0;
  cells: Cell[] = [];

  constructor(
    private _domSanitizer: DomSanitizer,
    private _notebooksService: NotebooksService
  ) {}

  ngOnInit(): void {
    this._notebooksService
      .getNotebook('assets/TD_SentimentExtractor.ipynb')
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.cells = this._notebooksService.parseNotebook(data);
          console.log(this.cells);
        },
        error: (error) => {
          console.error('Error loading notebook', error);
        },
        complete: () => {
          console.log('Notebook loading complete');
        },
      });
  }

  editMdCell(): void {}

  selectCell(index: number): void {
    this.cells.forEach((cell) => (cell.selected = false));
    this.cells[index].selected = true;
  }

  trustContent(md: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(md);
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {}
}
