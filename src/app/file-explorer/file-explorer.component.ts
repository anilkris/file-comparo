import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileStructureService } from '../file-structure.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule,DragDropModule ],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss'
})
export class FileExplorerComponent {

  @Input() node: any;
  @Output() itemDragged = new EventEmitter<string>();

  isObject(val: any): boolean {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  isLeafNode(val: any): boolean {
    return typeof val === 'string'; // Adjust based on your leaf node criteria
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  startDrag(item: string): void {
    this.itemDragged.emit(item);
  }
}
