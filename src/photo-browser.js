import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class PhotoBrowser {

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;

    this.heading = 'Photos';
    this.users = [];
  }

  activate() {
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => {
        this.users = users;
      });
  }
}
