export interface Ride {
    bookedBy: string;
    id: number;
    offerId: number;
    name: string;
    car: string,
    seatsLeft: number,
    pickUp: string,
    destination: string
}



export class Offerride implements Ride {
    public name: string;
    public pickUp: string;
    public destination: string;
    public car: string;
    public seatsLeft: number;

    constructor() {
        this.name = '';
        this.pickUp = '';
        this.destination = '';
        this.car = '';
        this.seatsLeft = 0;
    }
    bookedBy: string='';
    id: number=0;
    offerId: number=0;
}
