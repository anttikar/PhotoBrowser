import {inject} from 'aurelia-framework';
import RestService from './services/RestService';

@inject(RestService)
export class PhotoBrowser {

  constructor(RestService) {
    this.restApi = RestService;

    this.heading = 'Photos';
    this.users = [];
  }

  activate() {
    return this.restApi.fetch('users')
      .then(response => response.json())
      .then(users => {
        this.users = users;
      });
  }

}
