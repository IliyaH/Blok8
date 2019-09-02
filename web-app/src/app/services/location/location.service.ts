import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from 'src/app/models/models';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private proxy: any;  
  private proxyName: string = 'Location';  
  private connection: any;  
  public connectionExists: Boolean; 

  public notificationReceived: EventEmitter < string >;  

  constructor() {  
      this.notificationReceived = new EventEmitter<string>();
      this.connectionExists = false;  
      // create a hub connection  
      this.connection = $.hubConnection("http://localhost:52295/");
      this.connection.qs = { "token" : "Bearer " + localStorage.jwt};
      // create new proxy with the given name 
      this.proxy = this.connection.createHubProxy(this.proxyName);  
      
  }  
 
  // browser console will display whether the connection was successful    
  public startConnection(): Observable<Boolean> { 
      
    return Observable.create((observer) => {
       
        this.connection.start()
        .done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
            this.connectionExists = true;

            observer.next(true);
            observer.complete();
        })
        .fail((error: any) => {  
            console.log('Could not connect ' + error);
            this.connectionExists = false;

            observer.next(false);
            observer.complete(); 
        });  
      });
  }

  public registerForClickEvents(): void {  
      
      this.proxy.on('userClicked', (data: string) => {  
          console.log('received notification: ' + data);  
          this.notificationReceived.emit(data);  
      }); 
  }  

  public registerForHello() : Observable<any> {
      
    return Observable.create((observer) => {

        this.proxy.on('hello', (data: any) => {  
            console.log('Stiglo sa backa');
            console.log(data);  
            observer.next(data);
        });  
    });      
  }

  public StopTimer() {
      this.proxy.invoke("StopTimeServerUpdates");
  }

  public StartTimer() {
      this.proxy.invoke("TimeServerUpdates");
  }

  public hello(stations: any[]){
    this.proxy.invoke("Hello", stations);
  }

  public stop(){
    this.connection.disconnected();
  }
}
