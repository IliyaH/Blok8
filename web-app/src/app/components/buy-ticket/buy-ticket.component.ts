import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  loggedIn = undefined;
  userData : any;
  userProfileActivated: any;
  userProfileType: any;
  selectedTicketType: any;
  price: any;
  addTicket: any;
  email: any;
  temp: any;
  isLoggedIn: boolean;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;

  constructor(private userService: UserService, private ticketService: TicketService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    this.selectedTicketType = "TimeTicket";
    this.getUser();
    this.initConfig();
    this.temp = localStorage['name'];
    console.log("Temp: " + this.temp);
    if(this.temp){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
    
  }

  onSelectTicketType(event : any){
    this.selectedTicketType = event.target.value;
    this.getUser();
  }

  getUser(){
      if(localStorage.getItem('name'))
      {
        this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;
        this.userProfileActivated = this.userData.Activated;
        this.userProfileType = this.userData.UserType;
        this.email = this.userData.Email;
        console.log(this.email);
        
        if(this.userProfileActivated != 1)
        {
          this.userProfileType = 0;
        }
        this.ticketService.getCena(this.selectedTicketType, this.userProfileType).subscribe( data => this.price = data);
      });
      }
      else
      {
        this.email = null;
        this.ticketService.getCena(this.selectedTicketType, 0).subscribe( data => this.price = data);
      }
  }

  buyTicket(){
    this.ticketService.addTicket(this.price, this.selectedTicketType, localStorage.getItem('name'), this.email).subscribe( data => this.addTicket = data);
    window.alert("You've buyed a ticked");
  }









  //PayPal
  private initConfig(): void {
    
   
    /*var diffDays =this.priceWDiscount;
.
    console.log("cena u dinarima: ", diffDays);
    diffDays = diffDays/118;
    var str = diffDays.toFixed(2);
    console.log("cena u evrima: ", str);*/

    this.payPalConfig = {
      currency: 'EUR',//ATniFSIBK8rHNVLG_PetS-skYOy0lfhJw1m7IlrlHhqLzAC7_HaD1fNQPX_y8nDiTvtfyn7uyQEyofp6
      clientId: 'ATniFSIBK8rHNVLG_PetS-skYOy0lfhJw1m7IlrlHhqLzAC7_HaD1fNQPX_y8nDiTvtfyn7uyQEyofp6',
      

      createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: '1',
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: '1'
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: '1',
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
          
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },

      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          //actions.order.get().then(details => {
            //  console.log('onApprove - you can get full order details inside onApprove: ', details);
         // });

      },//data.id, data.payer.email_address, data.payer.payer_id, this.price, this.selectedTicketType, this.userProfileType
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          //this.buyTimeTicket(data);
          console.log("USO SAM" + this.email + data);
          if(!this.loggedIn){
            this.userProfileType = 0;
            
          }
          this.ticketService.buyTicket(this.isLoggedIn, this.email, data.id, data.payer.email_address, data.payer.payer_id, this.price, this.selectedTicketType, this.userProfileType).subscribe();
          
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
         // this.showCancel = true;

      },
      onError: err => {
        window.alert("Something went wrong!");
          console.log('OnError', err);
          //this.showError = true;
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          //this.resetStatus();
      },
  };
}

}
