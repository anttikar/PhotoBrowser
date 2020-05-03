import {inject} from 'aurelia-framework';
import RestService from './services/RestService';

@inject(RestService)
export class PhotoBrowser {

  constructor(RestService) {
    this.restApi = RestService;

    this.heading = 'Photos';
    this.photos = [];
  }

  activate() {

    return this.restApi.get('photos')
      .then(response => response.json())
      .then(photos => {

        // Temp limit to show only 20 photos
        let somePhotos = [];
        for (let i = 0; i < 20; i++) {
          somePhotos.push(photos[i]);
        }

        this.photos = somePhotos;
      });
  }

}
