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

}
