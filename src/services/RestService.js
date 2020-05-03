import { Aurelia, inject, singleton, noView } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'fetch';

@inject(Aurelia, HttpClient)
@noView()
export default class RestService {

  constructor(Aurelia, HttpClient) {

    this.http = HttpClient;

    // Configure HTTP client
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/')
        .withInterceptor({
          request(request) {
            return request;
          },
          requestError(request) {
            return request;
          },
          response(response) {
            return response;
          },
          responseError(error) {
            throw error;
          }
        });
    });
  }

  /**
   * Http fetch without any params
   */
  fetch(url) {
    return this.fetchData(url);
  }

  /**
   * Http get request
   */
  get(url) {
    let params = {
      method: 'GET'
    };

    return this.fetchData(url, params);
  }

  /**
   * Fetch data from REST API
   */
  fetchData(url, params) {
    if (url) {
      let fetchPromise = this.http.fetch(url, params);
      let timeout = this.getFetchTimeout();

      return Promise.race([timeout, fetchPromise])
        .then(response => {
          return this.checkResponseStatus(response)
        });
    } else {
      return Promise.reject('url');
    }
  }

  /**
   * Returns a timeout promise of 60s
   */
  getFetchTimeout() {
    return new Promise(function(resolve) {
      setTimeout(resolve, 60*1000); // 60 seconds
    });
  }

  /**
   * Check response status and possible timeout
   */
  checkResponseStatus( response ) {
    if (response instanceof Response) {
      if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response);
      } else {
        return response.json().then(responseJson => {
          return Promise.reject(responseJson);
        });
      }
    } else {
      return Promise.reject('timeout');
    }
  }

}
