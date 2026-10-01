import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLinkWithHref, RouterLink } from '@angular/router';
import { ProductCategoryMemu } from './components/product-category-memu/product-category-memu';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCategoryMemu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
  firstName='thaher';
  lastName='shaik';
}
