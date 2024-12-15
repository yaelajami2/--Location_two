import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private fb:FormBuilder){

  }
  form_group= this.fb.group(
    {
      'search':this.fb.control("")
    }
  ) 
search_location() {

document.querySelectorAll("tbody tr").forEach((e,key)=>{

  if(this.form_group.get('search')!.value!.toString().toLocaleLowerCase()!=="" &&!(e.querySelectorAll("td[class*='cdk-column-name']")[0].textContent !=null &&e.querySelectorAll("td[class*='cdk-column-name']")[0].textContent!.toLocaleLowerCase()!.indexOf(this.form_group.get('search')!.value!.toString().toLocaleLowerCase())>=0)){
   e.setAttribute("show","false")
  }
  else{
    e.setAttribute("show","true")
  }
  
})
}

}
