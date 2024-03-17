import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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

  private http=inject(HttpClient);
  constructor() {}

  getStructure(): Observable<any> {
    return of(this.fileStructure);
  }

  getStructureFromServer(): Observable<any> {
    return this.http.get('http://localhost:3000/api/files');

  }

   fetchFileContents(filePath: string): Observable<any> {
    // Construct the URL for the request based on the file path
    const url = `http://localhost:3000/api/files?path=${encodeURIComponent(filePath)}`;

    return this.http.get(url, { responseType: 'text' });
  }

}
