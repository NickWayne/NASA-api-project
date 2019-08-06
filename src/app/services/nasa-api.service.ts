import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private API_KEY = 'J3modHbIysxy8RiNkX44uxAvkkoFjVJdJbCeHkob';
  public getEpic(date: Date) {
    const dateInput = moment(date);
    const url = 'https://epic.gsfc.nasa.gov/api/natural/date/' + dateInput.format('YYYY-MM-DD');
    return fetch(url).then(res => res.json())
                    .then(json => {
                      const imageUrls = [];
                      json.forEach(data => {
                        const image = 'https://epic.gsfc.nasa.gov/archive/natural/';
                        const dateUrl = `${dateInput.year()}/${dateInput.format('MM')}/${dateInput.format('DD')}`;
                        imageUrls.push(image + dateUrl + `/png/${data.image}.png`);
                      });
                      return imageUrls;
                    });
  }

}
