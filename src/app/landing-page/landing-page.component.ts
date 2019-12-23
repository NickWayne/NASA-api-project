import { Component, OnInit } from '@angular/core';
import { NasaApiService } from '../services/nasa-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  apodUrl = '';
  mediatype = '';

  constructor(private ApiService: NasaApiService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.ApiService.getAPOD().then(json => {
                                    this.apodUrl = json.url;
                                    this.mediatype = json.media_type;
                                    console.log(this.apodUrl);
                                  });
  }

}
