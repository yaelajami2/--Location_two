import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SearchComponent,IndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Location';
}
