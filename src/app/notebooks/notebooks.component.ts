import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { take } from 'rxjs';
import { Cell } from '../models/cell';
import { NotebooksService } from './notebooks.service';
import { CovalentFlavoredMarkdownModule } from '@covalent/flavored-markdown';
import '@covalent/components/code-editor';
import '@covalent/components/icon';
import '@covalent/components/icon-button';
import '@covalent/components/notebook-cell';
import '@covalent/components/select';
import '@covalent/components/typography';

@Component({
  selector: 'app-notebooks',
  standalone: true,
  imports: [CommonModule, CovalentFlavoredMarkdownModule, DragDropModule],
  providers: [NotebooksService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notebooks.component.html',
  styleUrl: './notebooks.component.scss',
})
export class NotebooksComponent implements OnInit {
  @ViewChild('preview') previewContainer!: ElementRef;

  cells: Cell[] = [];
  clipboard: Cell[] = []; // To store cut/copy cells
  dragPreviewData!: Cell | null;
  selectedCellIndex: number | null = 0;

  constructor(
    private _domSanitizer: DomSanitizer,
    private _notebooksService: NotebooksService
  ) {}

  ngOnInit(): void {
    this._notebooksService
      .getNotebook('assets/ChartingDemo.ipynb')
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.cells = this._notebooksService.parseNotebook(data);
          this.selectCell(this.selectedCellIndex || 0);
        },
        error: (error) => {
          console.error('Error loading notebook', error);
        },
        complete: () => {
          console.log('Notebook loading complete');
        },
      });
  }

  // Method to copy the selected cell
  copy() {
    if (this.selectedCellIndex !== null) {
      const copiedCell = JSON.parse(
        JSON.stringify(this.cells[this.selectedCellIndex])
      );
      this.clipboard = [copiedCell];
    }
  }

  // Method to cut the selected cell
  cut() {
    if (this.selectedCellIndex !== null) {
      const cutCell = JSON.parse(
        JSON.stringify(this.cells[this.selectedCellIndex])
      );
      this.clipboard = [cutCell];
      this.delete(); // Remove the cell from the list
    }
  }

  // Deselect all cells in the notebook
  deselectCells(): void {
    this.cells.forEach((cell) => (cell.selected = false));
  }

  // Handle the drop event to rearrange cells
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cells, event.previousIndex, event.currentIndex);
    console.log(this.cells);
  }

  // Enable editing for a Markdown cell
  editMdCell(cell: Cell): void {
    cell.hideEditor = false;
  }

  // Method to generate the image source from the base64 encoded data
  getImgSrc(type: string, src: string): string {
    return `data:image/${type};base64,${src}`;
  }

  // Handle the drag end event, selecting the cell at the new position
  onDragEnded(index: number) {
    this.selectCell(index);
  }

  // Handle the drag start event, deselecting all cells
  onDragStarted() {
    this.deselectCells();
  }

  // Method to paste the cell(s) from the clipboard
  paste() {
    if (this.clipboard.length > 0) {
      // Insert the copied/cut cell(s) at the current position
      if (this.selectedCellIndex !== null) {
        const position = this.selectedCellIndex + 1;
        this.cells.splice(position, 0, ...this.clipboard);
        this.selectCell(position);
      }
    }
  }

  // Method to delete the selected cell
  delete() {
    if (this.selectedCellIndex !== null && this.cells.length > 0) {
      // Determine the new selected cell index
      let newSelectedIndex: number | null = null;

      if (this.cells.length === 1) {
        // Only one cell, so nothing will be selected
        newSelectedIndex = null;
      } else if (this.selectedCellIndex === this.cells.length - 1) {
        // Deleted cell is the last cell
        newSelectedIndex = this.selectedCellIndex - 1;
      } else {
        // Select the next cell
        newSelectedIndex = this.selectedCellIndex;
      }

      // Remove the cell from the list
      this.cells.splice(this.selectedCellIndex, 1);

      // Update the selected cell index
      this.selectedCellIndex = newSelectedIndex;

      // Perform selection update if necessary
      if (this.selectedCellIndex !== null) {
        this.selectCell(this.selectedCellIndex);
      }
    }
  }

  // Method to select a specific cell by its index
  selectCell(index: number): void {
    this.deselectCells();
    this.cells[index].selected = true;
    this.selectedCellIndex = index;
  }

  // Trust the HTML content, bypassing security
  trustContent(md: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(md);
  }
}
