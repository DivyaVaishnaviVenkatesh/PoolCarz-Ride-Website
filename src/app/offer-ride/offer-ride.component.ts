import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { AuthenticationService } from '../services/authentication.service';
import { Offerride } from './Offerride';
interface PostObject {
  id: number;
  bookedBy: string | null;
  [key: string]: number | string | null; // Allow any additional keys with specified types
}

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfferRideComponent implements OnInit {

  offerRideForm!: FormGroup ;
  rides: any[]=[];
  offerride = new Offerride();
  successMsg: string='';

  constructor(private formBuilder: FormBuilder, private restService: RestService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loginUser();
    const ridesData = localStorage.getItem('rides');
this.rides = ridesData ? JSON.parse(ridesData) : [];
    
    this.offerRideForm = this.formBuilder.group({
      name: ['', Validators.required],
      pickUp: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsLeft: ['', [Validators.required, this.seatNumberValidator]]
    });
  }

  seatNumberValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value > 0 && control.value < 8) {
      return null;
    }
    return { 'numberValid': true };
  }
  
  addRide() {
    const rides = localStorage.getItem('rides') !== null
  ? JSON.parse(localStorage.getItem('rides') as string)
  : [];
    const username = sessionStorage.getItem('username');
    
    const postObj: PostObject = {
      id: rides.length + 1,
      bookedBy: username !== null ? username : null
    };
    
    for (const rideproperty in this.offerride) {
      if (!postObj.hasOwnProperty(rideproperty)) {
        postObj[rideproperty] = this.offerRideForm.controls[rideproperty]?.value;
      }
    }
    
    rides.push(postObj);
    localStorage.setItem('rides', JSON.stringify(rides));
    this.successMsg = 'Added Successfully';
  }
  
}