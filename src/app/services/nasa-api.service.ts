import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private API_KEY = 'J3modHbIysxy8RiNkX44uxAvkkoFjVJdJbCeHkob';
  public getEpic(date: Date, imageType: string) {
    const dateInput = moment(new Date(date));
    const url = 'https://epic.gsfc.nasa.gov/api/' + imageType + '/date/' + dateInput.format('YYYY-MM-DD');
    return fetch(url).then(res => res.json())
                    .then(json => {
                      const imageUrls = [];
                      json.forEach(data => {
                        const image = 'https://epic.gsfc.nasa.gov/archive/' + imageType + '/';
                        const dateUrl = `${dateInput.year()}/${dateInput.format('MM')}/${dateInput.format('DD')}`;
                        imageUrls.push(image + dateUrl + `/png/${data.image}.png`);
                      });
                      return imageUrls;
                    });
  }

  public getRoverData(date: Date, roverName: string, cameraName: string, page = 0) {
    const dateInput = moment(new Date(date));
    let url = `https://mars-photos.herokuapp.com/api/v1/rovers/${roverName}/photos`;
    url += `?earth_date=${dateInput.format('YYYY-MM-DD')}`;
    if (cameraName !== 'all') {
      url += `&camera=${cameraName.split(' - ')[0]}`;
    }
    if (page > 0) {
      url += `&page=${page}`;
    }
    return fetch(url).then(res => res.json())
                    .then(json => {
                      const imageUrls = [];
                      console.log(json);
                      json.photos.forEach(data => {
                        imageUrls.push(data.img_src);
                      });
                      return imageUrls;
                    });
  }

  public getAPOD() {
    const dateInput = moment(new Date());
    const url = `https://api.nasa.gov/planetary/apod?api_key=${this.API_KEY}`;
    return fetch(url).then(res => res.json())
                    .then(json => {
                      return json;
                    });
  }

  public getApollo(apolloType: string, surface: boolean) {
    const apolloSearchInfo = {
      'Apollo 11': [1969, 1969, 'Apollo 11'],
      'Apollo 12': [1969, 1969, 'Apollo 12'],
      'Apollo 13': [1970, 1970, 'Apollo 13'],
      'Apollo 14': [1971, 1971, 'Apollo 14'],
      'Apollo 15': [1971, 1971, 'Apollo 15'],
      'Apollo 16': [1972, 1972, 'Apollo 16'],
      'Apollo 17': [1972, 1972, 'Apollo 17'],
    }[apolloType];
    let url = `https://images-api.nasa.gov/search?keywords=${apolloSearchInfo[2]}`;
    if (surface) {
      url += ',lunar surface';
    }
    url += `&year_start=${apolloSearchInfo[0]}&year_end=${apolloSearchInfo[1]}&media_type=image`;
    return fetch(url).then(res => res.json())
                    .then(json => {
                      return json.collection;
                    });
  }
}
