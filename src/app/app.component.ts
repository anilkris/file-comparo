import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { JsonCompareComponent } from './json-compare/json-compare.component';
import { ContainerComponent } from './container/container.component';
import { Container2Component } from './container2/container2.component';
import { HttpClientModule } from '@angular/common/http';
import { Container3Component } from "./container3/container3.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatButtonModule, HttpClientModule, JsonCompareComponent, ContainerComponent, Container2Component, Container3Component]
})
export class AppComponent {
  title = 'json-comparo';
}
