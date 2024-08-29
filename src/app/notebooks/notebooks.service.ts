import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cell } from '../models/cell';

@Injectable({
  providedIn: 'root',
})
export class NotebooksService {
  constructor(private http: HttpClient) {}

  getNotebook(filePath: string): Observable<any> {
    return this.http.get(filePath);
  }

  parseNotebook(jsonData: any): any {
    // Process the notebook JSON data here
    // Example: Extract code cells
    const codeCells = jsonData.cells || [];
    console.log(jsonData);
    const kernel = jsonData?.metadata?.kernelspec?.name || '';
    codeCells.forEach((cell: Cell) => {
      const isMarkdown = cell.cell_type === 'markdown';
      cell.hideEditor = isMarkdown;
      cell.hideCount = isMarkdown;
      cell.language = isMarkdown
        ? cell.cell_type
        : this.getNotebookLanguage(kernel);
      if (isMarkdown) {
        cell.outputs = [{ data: { 'text/markdown': cell.source } }];
      }
    });
    return codeCells;
  }

  //  Return the language to be assigned to code cells in the notebook
  getNotebookLanguage(kernel: string): string {
    if (kernel.includes('sql')) {
      return 'sql';
    } else if (kernel === 'ir') {
      return 'r';
    }
    return 'python';
  }
}
