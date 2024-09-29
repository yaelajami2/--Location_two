import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() elementId:string = "0";  // Accept element ID
  @Output() alertResponse = new EventEmitter<{ confirmed: boolean, id: string }>();

  onYesClick(): void {
    this.alertResponse.emit({ confirmed: true , id: this.elementId.toString() });  // Pass ID on Yes
  }

  onNoClick(): void {
    this.alertResponse.emit({ confirmed: false, id: this.elementId.toString() });  // Pass ID on No
  }
}
