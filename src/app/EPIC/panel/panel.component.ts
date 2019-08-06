import { Component, OnInit } from '@angular/core';
import { NasaApiService } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  data = [];
  selected = 0;
  maxNumber = 0;
  manualStep = false;
  currentDate = new Date();
  interval = setInterval(() => {}, 10000);
  imageType = 'natural';
  constructor(private ApiService: NasaApiService) { }

  changeStep() {
    if (this.manualStep) {
      clearInterval(this.interval);
    } else {
      this.createGlobe(this.currentDate);
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
    this.createGlobe(new Date());
  }
}
