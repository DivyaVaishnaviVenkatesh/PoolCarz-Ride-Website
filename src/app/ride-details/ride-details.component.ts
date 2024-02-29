import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Ride } from '../book-ride/Ride';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RideDetailsComponent implements OnInit {
  @Input() selectedRide: Ride | null = null;
  @Output() onBookRide = new EventEmitter<{ rideId: number, status: string }>();

  bookButtonText: string = 'Book!';
  bookStatus: string = '';
  makeCancelButton: boolean = false;
  cancelled: number = 0;
  isError: number = 0;
  onRideDeleted: any;

  constructor() { }

  ngOnInit() { }

  bookRideStart(rideId: number) {
    if (rideId && this.selectedRide) {
      let status = '';
      const ridesData = localStorage.getItem('rides');
      const rides: Ride[] = ridesData ? JSON.parse(ridesData) : [];

      const selectedRide = rides.find((item: Ride) => item.id === rideId);

      if (selectedRide) {
        if (
          this.cancelled === 0 &&
          selectedRide.bookedBy !== sessionStorage.getItem('username') &&
          selectedRide.seatsLeft !== 0
        ) {
          // Booking logic...
          status = 'booked';
        } else if (
            selectedRide.bookedBy === sessionStorage.getItem('username') ||
            selectedRide.seatsLeft === 0
        ) {
          // Handle not booking...
          status = 'not_booked';
        } else {
          // Cancel booking logic...
          status = 'cancelled';
        }

        const statusObjToParent = { rideId: rideId, status: status };
        this.onBookRide.emit(statusObjToParent);
      }
    }
  }
 


deleteRide(rideId: number) {
  if (rideId) {
    try {
      const ridesData = localStorage.getItem('rides');
      let rides: Ride[] = ridesData ? JSON.parse(ridesData) : [];

      rides = rides.filter((item: Ride) => item.id !== rideId);

      localStorage.setItem('rides', JSON.stringify(rides));
      console.log('Ride deleted successfully!');
    } catch (error) {
      console.error('Error deleting ride:', error);
    }
  }
}


  showRideDetails(ride: any) {
    this.selectedRide = ride;
  }
}
