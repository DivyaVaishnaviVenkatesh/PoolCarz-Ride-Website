import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { RestService } from '../services/rest.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Ride } from './Ride';


interface StatusObjFromChild {
   rideId: number;
   status: string;
 }
 


@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BookRideComponent implements OnInit {
  selectedRideObj: Ride = {
    bookedBy: null,
    id: 0,
    offerId: '',
    name: '',
    car: '',
    seatsLeft: 0,
    pickUp: '',
    destination: ''
  };
   displayRides: boolean=false; // Display ride list
  buttonToggle: boolean=false; // Change Show all rides button color
  buttonToggleTo: boolean=false; // Change To Infosys button color
  buttonToggleFrom: boolean=false; // Change From Infosys button color
  buttonToggleOther: boolean=false; // Change Other button color
  filterRideClicked: boolean=false; // Detect if filter ride was clicked
  showSelectedRide: boolean=false; // Display ride details child component
  ridesArray: any[]=[]; // array containing all the rides as objects
  //selectedRideObj: Object={}; // selected ride object
  rideFilterOption: string=''; // Filter option like 'to_infosys','from_infosys' etc..
  errorMessage: string='';
  constructor(private restService: RestService, private authenticationService: AuthenticationService) {
    this.displayRides = false;
    this.getRides();
  }

  ngOnInit() {
    this.authenticationService.loginUser();
  }

  getRides() {
   const localStorageRides = localStorage.getItem('rides');
   if (localStorageRides !== null) {
     this.ridesArray = JSON.parse(localStorageRides);
   } else {
     this.restService.getAllRides().subscribe(
       (rides: any[]) => { // Define the type for rides parameter
         localStorage.setItem('rides', JSON.stringify(rides));
         this.ridesArray = rides;
       },
       (error: any) => this.errorMessage = error // Define the type for error parameter
     );
   }
 }
 


  toogleDisplayRides() {
   this.displayRides = this.displayRides ?  false : true;
   this.buttonToggle = this.filterRideClicked ? false : this.buttonToggle ?  false : true;
   this.filterRideClicked = false;
   this.rideFilterOption = '';
   this.showSelectedRide = false;
   this.toggleFilterButtonColor();
  }

  showRides(rideFilter: string) {
   this.rideFilterOption = rideFilter;
   this.buttonToggle = false;
   this.filterRideClicked = true;
   this.toggleFilterButtonColor(rideFilter);
 }
 
  toggleFilterButtonColor(buttonIdentifier: string = '') {
    this.buttonToggleTo = false;
    this.buttonToggle = false;
    this.buttonToggle = false;
    switch (buttonIdentifier) {
        case 'to_iplanet':
            this.buttonToggleTo = true;
            break;
        case 'from_iplanet':
            this.buttonToggle = true;
            break;
        case 'others':
            this.buttonToggle = true;
            break;
    }
  }

  showRideDetails(rides: Ride) {
    this.showSelectedRide = true;
    this.selectedRideObj = rides;
    this.filterRideClicked = false;
  }
  
// Inside bookRideStart method

bookRideComplete(statusObjFromChild: StatusObjFromChild) {
  this.displayRides = false;
  this.buttonToggle = false;

  this.ridesArray = this.ridesArray.map(item => {
    if (item.id === statusObjFromChild.rideId) {
      /*
       * Update seats based on emitted object from ride details component
       */
      if (statusObjFromChild.status === 'booked') {
        return { ...item, seatsLeft: item.seatsLeft - 1 }; // Update seats for booked ride
      } else if (statusObjFromChild.status === 'cancelled') {
        return { ...item, seatsLeft: item.seatsLeft + 1 }; // Update seats for cancelled ride
      }
    }
    return item;
  });

  localStorage.setItem('rides', JSON.stringify(this.ridesArray));
}

}
