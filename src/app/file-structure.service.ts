import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStructureService {

  private fileStructure = {
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

  constructor() {}

  getStructure(): Observable<any> {
    return of(this.fileStructure);
  }
}
