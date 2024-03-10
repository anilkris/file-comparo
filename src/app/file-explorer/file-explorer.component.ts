import { Component, Input } from '@angular/core';
import { FileStructureService } from '../file-structure.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-explorer.component.html',
  styleUrl: './file-explorer.component.scss'
})
export class FileExplorerComponent {

   @Input() fileStructure: any;

   objectKeys = Object.keys;

  constructor(private fileStructureService: FileStructureService) { }

  ngOnInit(): void {
    if (!this.fileStructure) {
      this.fileStructureService.getStructure().subscribe(data => {
        this.fileStructure = data;
      });
    }
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && !Array.isArray(value);
  }


}
