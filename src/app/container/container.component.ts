import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-container',
  standalone: true,
  imports: [DragDropModule,CommonModule ,CdkDrag],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit {

  directoryStructure!: any[];

  droppedItems1: any[] = [];
  droppedItems2: any[] = [];

  ngOnInit() {
    const jsonData = {
      "server": { "files": ["/your/project/path/server/server.js"] },
      "src": {
        "app": {
          "files": [
            "/your/project/path/src/app/app.component.css",
            "/your/project/path/src/app/app.component.html"
          ]
        },
        "files": ["/your/project/path/src/index.html", "/your/project/path/src/styles.css"]
      },
      "files": ["/your/project/path/package.json"]
    };

    this.directoryStructure = this.processData(jsonData);
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
  

  drop(event: CdkDragDrop<any[]>, targetPane: 'pane1' | 'pane2') {
    console.log('Dropped event: ', event);
    // Copy the dropped data instead of transferring it
    const item = event.previousContainer.data[event.previousIndex];
    const targetList = targetPane === 'pane1' ? this.droppedItems1 : this.droppedItems2;

    console.log('Dropped item: ', item, ' in pane: ', targetPane);  
    // Check if the item is already dropped in the target pane to avoid duplicates
    if (!targetList.includes(item)) {
      targetList.push(item); // Copy the item
    }
  }

}
