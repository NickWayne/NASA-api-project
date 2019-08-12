import { Component, OnInit } from '@angular/core';
import { NasaApiService } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})

export class EpicComponent implements OnInit {
  data = [];
  selected = 0;
  maxNumber = 0;
  manualStep = false;
  currentDate = new Date(2019, 5, 4);
  interval = setInterval(() => {}, 10000);
  imageType = 'natural';
  constructor(private ApiService: NasaApiService) { }

  toggleAnimation() {
    this.manualStep = !this.manualStep;
    clearInterval(this.interval);
    if (!this.manualStep) {
      this.interval = setInterval(() => {
        this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
      }, 4000 / this.maxNumber);
    }
  }

  upFrame() {
    this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
  }

  downFrame() {
    this.selected = this.selected - 1 < 0 ? this.maxNumber : this.selected - 1;
  }

  createGlobe(date: Date) {
    this.currentDate = date;
    this.manualStep = false;
    clearInterval(this.interval);
    this.ApiService.getEpic(date, this.imageType)
      .then(images => {
        this.data = images;
        this.maxNumber = images.length - 1;
        this.interval = setInterval(() => {
          this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
        }, 4000 / this.maxNumber);
      });
  }

  ngOnInit() {
    this.createGlobe(new Date(2019, 5, 4));
  }
}

