import {inject} from 'aurelia-framework';
import RestService from './services/RestService';

@inject(RestService)
export class PhotoBrowser {

  constructor(RestService) {
    this.restApi = RestService;

    this.photos = [];
    this.page_index = 1;
    this.page_limit = 20;
    this.loadingMoreImages = false;
  }

  activate() {
    return this.fetchImages();
  }

  attached() {
    // Add scroll event listener for infinite scrolling
    this.addScrollEventListener();
  }

  detached() {
    // Remove listener
    $('.page-host').unbind('scroll');
  }

  /*
   * Add scroll event listener to fire image fetching for infinite scrolling
   */
  addScrollEventListener() {
    let self = this;
    let scrollTimer = null;
    $('.page-host').scroll(function() {
      if (scrollTimer) {
        clearTimeout(scrollTimer);   // Clear any previous pending timer
      }
      scrollTimer = setTimeout(function() {
        if ($('#infiniteScrollDiv').offset().top < window.innerHeight) {
          self.loadMoreImages();
        }
      }, 200); // Set 200ms timer to prevent too many calls too quickly
    });
  }

  /*
   * Fetch next page of images
   */
  loadMoreImages() {
    // Show loading icon
    this.loadingMoreImages = true;

    // Get next page of images
    this.page_index += 1;
    this.fetchImages();
  }

  /*
   * Fetch photos from REST API
   */
  fetchImages() {
    // Get URL with parameters
    let url = 'photos?';
    url += '_page=' + this.page_index;
    url += '&_limit=' + this.page_limit;

    // Fetch photos
    return this.restApi.get(url)
      .then(response => response.json())
      .then(loadedPhotos => {
        // Add fetched photos to end of the array
        this.photos.push.apply(this.photos, loadedPhotos);
        this.loadingMoreImages = false;
      }).catch(e => {
        console.log(e);
        this.loadingMoreImages = false;
      });
  }

}
