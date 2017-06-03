import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Http} from "angular2/http";
import 'rxjs/Rx';

@Injectable()

export class Service{
  constructor(private _http: Http){

  }

getCountryInfo(lat: String, lon: String): Observable<any>{
  console.log("Called1");

    return this._http.get('http://api.geonames.org/timezoneJSON?lat='+lat+'&lng='+ lon+'&username=arosha')
      .map(response => response.json())
      .catch(error => {
        alert("Data not found!!");
        console.error(error);
        return Observable.throw(error.json());
      });

  }
  getCurrency(code: String): Observable<any>{
    console.log("Called2");

    return this._http.get('https://restcountries.eu/rest/v2/alpha/'+code)
      .map(response => response.json())
      .catch(error => {
        alert("Data not found!!");
        console.error(error);
        return Observable.throw(error.json());
      });

  }

}
