import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  // variables
  isDark: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.verifyStorage();
  }

  // coockies functions
  verifyStorage(): void {
    if (localStorage.getItem("WeatherTheme") === null) {
      localStorage.setItem("WeatherTheme", JSON.stringify(this.isDark = false));
    } else {
      this.isDark = JSON.parse(localStorage.WeatherTheme);
      this.changeTheme();
      this.btnslideWithCoockies();
    }
  }

  updateStorage(): void {
    localStorage.setItem("WeatherTheme", JSON.stringify(this.isDark));
  }

  // change theme functions
  changeTheme(): void {
    if (this.isDark) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }

  btnslideWithCoockies(): void {
    const themeToggler = document.getElementById("button");

    if (this.isDark) {
      themeToggler.classList.add("darkTHeme");
    } else {
      themeToggler.classList.remove("darkTHeme");
    }
  }

  btnSlide(themeToggler: HTMLElement): void {
    if (!this.isDark) {
      this.isDark = true;
      themeToggler.classList.add("darkTHeme");
      setTimeout(() => {
        this.changeTheme();
      }, 150);
    } else {
      this.isDark = false;
      themeToggler.classList.remove("darkTHeme");
      setTimeout(() => {
        this.changeTheme();
      }, 150);
    }
    this.updateStorage();
  }

  getWeather() {
    // this.weatherService.getWeather(location).subscribe((data) => {
    //   this.userService.mail = data.body[0].email;
    //   this.userService.username = data.body[0].username;
    // }, (err) => {
    //   return err;
    // });
  }

  changeDay(today: HTMLElement, tomorrow: HTMLElement) {
    today.classList.toggle('active');
    tomorrow.classList.toggle('active');
  }
}
