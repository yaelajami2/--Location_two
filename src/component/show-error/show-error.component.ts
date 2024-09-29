import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  standalone: true,
  imports: [CommonModule,JsonPipe],
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.css'
})
export class ShowErrorComponent {
@Input()
message:ValidationErrors|undefined |null=undefined
@Input()
name:ValidationErrors|undefined |null=undefined
}
