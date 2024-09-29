import { Component, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { location } from '../../Models/location';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShowErrorComponent } from '../show-error/show-error.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ReactiveFormsModule,ShowErrorComponent,AsyncPipe,AlertComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent { 
  isAlertVisible: boolean = false;  // Control alert visibility
  selectedElementId: string = "0";  // Hold the selected element ID

  // Open the alert and pass the element ID
  openAlert(id: string): void {
    this.selectedElementId = id;
    this.isAlertVisible = true;
  }
   constructor(private location_s:LocationService,private fb:FormBuilder){


}
data$: Observable<Location[]> = this.location_s.data$;
   
  ngOnInit(): void {
    // Subscribe to data updates

    this.data$.subscribe( data => {
      console.log('Data updated:', data);
     
    });
  }
currenL_location=new location("0","");

Edit_Item() {
  document.body.classList.add('modal-open'); // מניעת גלילה
  this.location_s.edite_location(new location(this.currenL_location.Id,this.group_form.get("name")!.value!.toString())).subscribe(()=>{this.Is_Show_Form=0;});
}
Add_Item() {
  document.body.classList.add('modal-open'); // מניעת גלילה
  this.location_s.add_location(this.group_form.get("name")!.value!.toString()).subscribe(()=>{this.Is_Show_Form=0;});
}
  group_form = this.fb.group({
    name:['',[Validators.minLength(2),Validators.required]]
  });


Is_Show_Form:number=0;


DeleteItem(id:string) {
  
  this.location_s.delete_location(id).subscribe(()=>{});

} 

handleAlertResponse(response: { confirmed: boolean, id: string }) {
  this.isAlertVisible = false;  // Hide the alert after the response

  if (response.confirmed) {
    console.log('Confirmed for ID:', response.id);
    this.DeleteItem( response.id);  // Execute the function if Yes is clicked
  }
    // Add your logic here, e.g., delete item or perform another action
  }
}

