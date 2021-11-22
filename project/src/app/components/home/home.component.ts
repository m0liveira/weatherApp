import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // variables
  isDark: boolean;

  constructor() { }

  ngOnInit(): void {
    this.verifyStorage();

    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
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

  // get the clock function
  getCurrentTime(): void {
    var time: any = document.getElementById("time")
    let date: Date = new Date();
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();

    hours <= 9 && hours >= 0 ? hours = "0" + hours : hours
    minutes <= 9 && minutes >= 0 ? minutes = "0" + minutes : minutes;

    time.innerHTML = hours + ":" + minutes;
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
}
