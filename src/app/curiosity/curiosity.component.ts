import { Component, OnInit } from '@angular/core';
import { NasaApiService } from '../services/nasa-api.service';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit {
  data = [];
  selected = 0;
  maxNumber = 1;
  manualStep = false;
  timePerImage = 1;
  interval = setInterval(() => {}, 10000);
  minDate = new Date(2012, 7, 7);
  maxDate = new Date();
  date = new Date();
  roverTypes = {
    Curiosity: {
      startDate: new Date(2012, 7, 7),
      endDate: new Date(),
      Cameras: [
        'FHAZ - Front Hazard Avoidance Camera',
        'NAVCAM - Navigation Camera',
        'MAST - Mast Camera',
        'CHEMCAM - Chemistry and Camera Complex',
        'MAHLI - Mars Hand Lens Imager',
        'MARDI - Mars Descent Imager',
        'RHAZ - Rear Hazard Avoidance Camera'
      ]
    },
    Spirit: {
      startDate: new Date(2004, 0, 5),
      endDate: new Date(2010, 2, 21),
      Cameras: [
        'FHAZ - Front Hazard Avoidance Camera',
        'NAVCAM - Navigation Camera',
        'PANCAM - Panoramic Camera',
        'MINITES - Miniature Thermal Emission Spectrometer (Mini-TES)',
        'ENTRY - Entry, Descent, and Landing Camera',
        'RHAZ - Rear Hazard Avoidance Camera'
      ]
    },
    Opportunity: {
      startDate: new Date(2004, 0, 26),
      endDate: new Date(2018, 5, 9),
      Cameras: [
        'FHAZ - Front Hazard Avoidance Camera',
        'NAVCAM - Navigation Camera',
        'PANCAM - Panoramic Camera',
        'MINITES - Miniature Thermal Emission Spectrometer (Mini-TES)',
        'ENTRY - Entry, Descent, and Landing Camera',
        'RHAZ - Rear Hazard Avoidance Camera'
      ]
    }
  };
  rovers = Object.keys(this.roverTypes);

  constructor(private ApiService: NasaApiService) { }

  generateDateFilter() {
    return null;
  }

  toggleAnimation() {
    this.manualStep = !this.manualStep;
    clearInterval(this.interval);
    if (!this.manualStep) {
      this.interval = setInterval(() => {
        this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
      }, this.timePerImage * 1000);
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

  getRoverImages(date: Date, roverName: string, cameraName: string, roverChange: boolean = false) {
    this.manualStep = false;
    this.selected = 0;
    this.minDate = this.roverTypes[roverName].startDate;
    this.maxDate = this.roverTypes[roverName].endDate;
    this.date = this.minDate;
    date = roverChange ? this.minDate : date;
    cameraName = roverChange ? 'all' : cameraName;
    clearInterval(this.interval);
    this.ApiService.getRoverData(date, roverName, cameraName, 0)
                    .then(images => {
                      this.data = images;
                      console.log(images.length);
                      this.maxNumber = images.length - 1;
                      this.interval = setInterval(() => {
                        this.selected = this.selected + 1 > this.maxNumber ? 0 : this.selected + 1;
                      }, this.timePerImage * 1000);
                    });
  }

  ngOnInit() {
    this.getRoverImages(this.date, 'Curiosity', 'all', true);
  }

}
