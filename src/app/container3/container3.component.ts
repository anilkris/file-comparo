import { Component } from '@angular/core';
import { FileStructureService } from '../file-structure.service';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';


import {
  CdkDragDrop,
  CdkDropList,
  CdkDragPreview,
  CdkDrag,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import e from 'express';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-container3',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPreview, FileExplorerComponent,CommonModule],
  templateUrl: './container3.component.html',
  styleUrl: './container3.component.scss'
})
export class Container3Component {

 

  fileStructure: any;

  fileContents: string = '';

  directoryStructure: any;
   constructor(private fileStructureService: FileStructureService) {}
   lastDraggedItem: string | null = null;




  ngOnInit() {
    if (!this.fileStructure) {
      this.fileStructureService.getStructureFromServer().subscribe(data => {
        this.fileStructure = data;
        console.log(this.fileStructure);
        this.directoryStructure = this.findLeafNodes(this.fileStructure);
      });
    }
  }
  handleItemDragged(item: string): void {
    console.log('Item dragged:', item);
  }

  drop(event: CdkDragDrop<string[]>, paneId: string): void {
    console.log(`Item dropped in ${paneId}`);
  }


    findLeafNodes(obj: any, leaves: string[] = []) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(item => leaves.push(item));
        } else if (typeof value === 'object') {
         this.findLeafNodes(value, leaves);
        } else {
          leaves.push(value);
        }
      });
      return leaves;
    }
}
