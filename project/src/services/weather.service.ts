import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var config = require('./config');

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // vars
  apiLink: string = 'https://api.m3o.com/v1/weather/Forecast';

  constructor(private http: HttpClient) { }

  getWeather(location) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${config.token}`
    });

    let data = {
      "days": 7,
      "location": location
    }

    return this.http.post(this.apiLink, data, { headers: headers, observe: 'response' });
  }
}
