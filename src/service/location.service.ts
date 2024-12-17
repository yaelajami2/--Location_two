import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, throwError } from 'rxjs';
import { Location } from '../Models/location';
import { UserInfoService } from '../Models/UserInfoService';



@Injectable({
  providedIn: 'root' 
})
export class LocationService {
   //apiUrl="https://location-mongo.onrender.com/api/location";
   //api="https://localhost:44316/api";
  api="https://location-mongo.onrender.com/api";
  apiUrl=this.api+"/location";    
  list_location=new BehaviorSubject<Location[]>([]);
  data$: Observable<Location[]> = this.list_location.asObservable(); 
  add_confidential_information():Observable<void>{
    console.log("insert")
        // console.log("Attempting initialization", new Date);
    let location_info:String="" ;
    this.userInfo.getLocation()
    .then((location) => {location_info= "longitude:"+location.longitude+"latitude:"+location.latitude;})
    .catch((error) => console.error('Error getting location:', error));
     const headers = new HttpHeaders({ 
      "Content-Type": "application/json",
      'Accept': '*/*'
    });

return this.http.post<any>(this.api+"/User_Log/insertById", { id: "0",
  "location": location.toString(),
  "date": (new Date()).toString(),
  "screenInfo":"screenHeight:"+ this.userInfo.getScreenInfo().screenHeight.toString()+" screenWidth:"+ this.userInfo.getScreenInfo().screenWidth.toString()} ,{headers}

 )
  }
  constructor(private http:HttpClient,private userInfo: UserInfoService ) {
  this.add_confidential_information().subscribe(()=>{

  });
       this.get_location();

  

  }
  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
          (error) => reject(error)
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  }
  
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
        "Content-Type": "application/json",
        'Accept': '*/*'
      });
     
      

  return this.http.post<any>(this.apiUrl+"/insertById", { id: "0" ,name:Name} ,{headers}
  
   ).pipe( 
    map(() => {
     this.get_location()
 })
 );};

edite_location(object_location:Location):Observable<void>{


 return this.http.request<void>('PUT', this.apiUrl+"/updateById", {
  body: JSON.stringify({ id: object_location.id ,name:object_location.name}),
  headers: { 'Content-Type': 'application/json' }
}).pipe( 
  map(() => {
   this.get_location()
})
);}
}
