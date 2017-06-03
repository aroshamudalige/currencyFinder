import {Component} from 'angular2/core';
import {ControlGroup} from "angular2/common";
import {Service} from "./app.service";
import {Observable} from "rxjs";

@Component({
    selector: 'my-app',
    providers: [Service],
    template: `
        <section id="info">
        <h1>Currency Finder</h1>
        
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
          Latitude: <input type="text" ngControl="lat">
          Longitude: <input type="text" ngControl="lon">
          <button type="submit" >Go</button>
        </form>
        <div>Country: {{country}}</div><br>
        <div>Currency: {{currency}}</div>
       </section>
        
    `,
})
export class AppComponent {
  constructor(private _Service: Service){
    country: String;
    currency: String;

  }
  onSubmit(form: ControlGroup){
    this._Service.getCountryInfo(form.value.lat, form.value.lon)
      .subscribe(
        data => {
          console.log(data.countryName + ' ' + data.countryCode);
          this.country = data.countryName;
          this._Service.getCurrency(data.countryCode).subscribe(
            data => {
              console.log(data.currencies[0].name);
              this.currency = data.currencies[0].name;
            }
          );
        }
      );
  }



}
