import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { location } from '../Models/location';



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiUrl="https://location-mongo.onrender.com/api/location";
  list_location=new BehaviorSubject<Location[]>([]);
  data$: Observable<Location[]> = this.list_location.asObservable(); 
  constructor(private http:HttpClient) {   this.get_location();}
  get_location(){
     this.http.get<Location[]>(this.apiUrl).pipe(
    
     ).subscribe(data => {
      this.list_location.next(data);
    });
  }
  delete_location(id:string):Observable<void>{
    return this.http.request<void>('Delete', this.apiUrl+`/deleteById/${id}`).pipe( 
       map(() => {
        this.get_location()
    })
    )};
    add_location(Name:string):Observable<void>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',  
  'Accept': '*/*'
      });
      let data = new location('0', 
 Name // Replace with actual name
      );
  return this.http.post<any>(this.apiUrl+"/insertById", data, { headers }
  
   ).pipe( 
    map(() => {
     this.get_location()
 })
 );};

edite_location(object_location:location):Observable<void>{


 return this.http.request<void>('PUT', this.apiUrl+"/updateById", {
  body: JSON.stringify({ id: object_location.Id ,name:object_location.name}),
  headers: { 'Content-Type': 'application/json' }
}).pipe( 
  map(() => {
   this.get_location()
})
);}
}
