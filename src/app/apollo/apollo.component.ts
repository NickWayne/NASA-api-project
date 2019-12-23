import { Component, OnInit } from '@angular/core';
import { NasaApiService } from '../services/nasa-api.service';

@Component({
  selector: 'app-apollo',
  templateUrl: './apollo.component.html',
  styleUrls: ['./apollo.component.css']
})
export class ApolloComponent implements OnInit {

  images = [];
  landings = ['Apollo 11', 'Apollo 12', 'Apollo 13', 'Apollo 14', 'Apollo 15', 'Apollo 16', 'Apollo 17'];
  imageTypes = ['orig', 'thumb'];
  imageType = this.imageTypes[1];
  selected = 0;
  maxNumber = 1;
  manualStep = false;
  surfaceImages = true;
  timePerImage = 1;
  interval = setInterval(() => {}, 10000);
  constructor(private ApiService: NasaApiService) { }

  toggleAnimation() {
    this.manualStep = !this.manualStep;
    clearInterval(this.interval);
    if (!this.manualStep) {
      this.interval = setInterval(() => {
        this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
      }, this.timePerImage * 1000);
    }
  }

  toggleSurface(lander: string) {
    this.surfaceImages = !this.surfaceImages;
    this.getApolloData(lander, this.surfaceImages);
  }

  toggleImageType() {
    if (this.imageType === 'orig') {
      this.imageType = 'thumb';
    } else {
      this.imageType = 'orig';
    }
  }

  updateInterval() {
    this.manualStep = false;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
    }, this.timePerImage * 1000);
  }

  upFrame() {
    this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
  }

  downFrame() {
    this.selected = this.selected - 1 < 0 ? this.maxNumber : this.selected - 1;
  }

  getApolloData(lander: string, surface: boolean) {
    this.images = [];
    this.manualStep = false;
    this.selected = 0;
    clearInterval(this.interval);
    this.ApiService.getApollo(lander, surface).then(json => {
      json.items.forEach(element => {
        const id = element.href.split('image/')[1].split('/')[0];
        this.images.push(element.href.slice(0, -15) + id);
      });
      this.maxNumber = this.images.length - 1;
      this.interval = setInterval(() => {
        this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
      }, this.timePerImage * 1000);
    });
  }

  ngOnInit() {
    this.getApolloData(this.landings[0], true);
  }

}
