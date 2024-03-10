import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { json } from 'stream/consumers';



@Component({
  selector: 'app-json-compare',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './json-compare.component.html',
  styleUrl: './json-compare.component.scss'
})
export class JsonCompareComponent {


   // Define the structure of your table rows here, e.g., if comparing name and age
  displayedColumns: string[] = ['key', 'value1', 'value2'];
  dataSource: { key: string, value1: any, value2: any }[] = [];
  jsonData1={};
  jsonData2={};

  constructor() {

    this.compareJson(this.jsonData1, this.jsonData2);
  }

  compareJson(json1: any, json2: any) {
    // Your comparison logic here. This is a simplistic example
    const keys = new Set([...Object.keys(json1), ...Object.keys(json2)]);
    keys.forEach(key => {
      this.dataSource.push({
        key: key,
        value1: json1[key] || 'N/A', // If key doesn't exist in json1, show 'N/A'
        value2: json2[key] || 'N/A'
      });
    });
  }

}
