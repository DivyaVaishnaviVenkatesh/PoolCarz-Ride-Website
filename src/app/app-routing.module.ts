import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { LoginComponent } from './login/login.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
// Routing configuration
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'book-ride' , component:BookRideComponent},
  {path:'ride-detail',component:RideDetailsComponent},
  {path:'offer-ride',component:OfferRideComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
