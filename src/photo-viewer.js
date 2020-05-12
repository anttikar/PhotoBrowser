import {inject} from 'aurelia-framework';
import RestService from './services/RestService';

@inject(RestService)
export class PhotoViewer {

  constructor(RestService) {
    this.restApi = RestService;

    this.heading = 'View photo';
  }

  activate(parameters) {
    let photoId = parameters.id;

    return this.restApi.get('photos/' + photoId)
        .then(response => response.json())
        .then(photo => {
          this.photo = photo;
        }).catch(e => {
          console.log(e);
        });
  }

}
