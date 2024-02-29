import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  filteredArray: any[]=[];
  transform(value: any[], args?: string): any[] {
    const place = 'iPlanet';
    switch (args) {
        case 'to_iplanet':
            this.filteredArray = value.filter(item => item.destination === place);
            break;
        case 'from_iplanet':
            this.filteredArray = value.filter(item => item.pickUp === place);
            break;
        case 'others':
            this.filteredArray = value;
            break;
        default:
            this.filteredArray = value;
    }
    return this.filteredArray;
  }

}
