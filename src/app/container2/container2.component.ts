import { Component, Input, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDragPreview,
  CdkDrag,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import e from 'express';
import { FileStructureService } from '../file-structure.service';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-container2',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CdkDragPreview, FileExplorerComponent,CommonModule],
  templateUrl: './container2.component.html',
  styleUrl: './container2.component.scss'
})
export class Container2Component implements OnInit{


  @Input() fileStructure: any;

  constructor(private fileStructureService: FileStructureService) {}
  directoryStructure!: any[];


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  pane1List = [''];
  pane2List = [''];

  objectKeys = Object.keys;



  ngOnInit() {
    if (!this.fileStructure) {
      this.fileStructureService.getStructureFromServer().subscribe(data => {
        this.fileStructure = data;
        this.directoryStructure = this.findLeafNodes(this.fileStructure);
      });
    }
  }

  processData(data: any, path: string[] = []): any[] {
    return Object.entries(data).map(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) { // Asserting that value is an array
        return value.map((file: string) => ({ path: [...path, file], type: 'file' }));
      } else if (typeof value === 'object' && value !== null) { // Asserting that value is an object
        return { path: [...path, key], children: this.processData(value, [...path, key]), type: 'directory' };
      }
      return []; // Return an empty array as fallback
    }).flat();
  }
 
   isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }
  drop(event: any , targetPane: 'pane1' | 'pane2' ) {

    console.log('Dropped event: ',JSON.stringify( event.previousContainer.data[event.previousIndex].path));
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }else {

         if (targetPane === 'pane1') {

          this.pane1List[0] = (event.previousContainer.data[event.previousIndex].path);
        }else if(targetPane === 'pane2') {
            
          this.pane2List[0] = (event.previousContainer.data[event.previousIndex].path);
        }

      }
   


      console.log('Dropped pane: ', targetPane);
    
    }


    findLeafNodes(obj: any, leaves: string[] = []) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (Array.isArray(value)) {
          // Assuming all array items are leaf nodes
          value.forEach(item => leaves.push(item));
        } else if (typeof value === 'object') {
         this.findLeafNodes(value, leaves);
        } else {
          // If the value is neither an array nor an object, it's a leaf node
          leaves.push(value);
        }
      });
      return leaves;
    }


    handleItemDragged(item: string): void {
      console.log('Item dragged:', item);
      // You can handle the dragged item here, e.g., store it in a variable
    }


  }
