import {inject} from 'aurelia-framework';
import {Container} from 'aurelia-framework';
import {App} from 'app';
import RestService from './services/RestService';

@inject(RestService)
export class PhotoBrowser {

  constructor(RestService) {
    this.restApi = RestService;
    this.app = Container.instance.get(App);

    this.photos = [];
    this.pageIndex = 1;
    this.pageLimit = 20;
    this.loadingMoreImages = false;
  }

  created() {
    // Get possible already loaded photos from App
    this.photos = this.app.photoBrowserData.photos;
    this.pageIndex = this.app.photoBrowserData.pageIndex;

    // If no photos already loaded, then load first page of photos
    if (this.photos.length === 0) {
      return this.fetchImages();
    }
  }

  attached() {
    // Add scroll event listener for infinite scrolling
    this.addScrollEventListener();
  }

  bind() {
    // Return to possible saved scroll position
    let self = this;
    if (this.app.photoBrowserData.scrollPosition !== undefined) {
      // Timeout needed to wait until the view is ready for scrolling
      setTimeout(() => {
        $('.page-host').scrollTop(self.app.photoBrowserData.scrollPosition);
      }, 200);
    }
  }

  canDeactivate() {
    // Save scroll position for returning to same position
    this.app.photoBrowserData.scrollPosition = $('.page-host').scrollTop();
  }

  unbind() {
    // Remove listener
    $('.page-host').unbind('scroll');
  }


  /*
   * Add scroll event listener to fire image fetching for infinite scrolling
   */
  addScrollEventListener() {
    let self = this;
    let scrollTimer = null;
    $('.page-host').scroll(() => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);   // Clear any previous pending timer
      }
      scrollTimer = setTimeout(() => {
        // If infinite scroll div is visible, then load more photos
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
    this.pageIndex += 1;
    this.app.photoBrowserData.pageIndex = this.pageIndex;

    this.fetchImages();
  }

  /*
   * Fetch photos from REST API
   */
  fetchImages() {
    // Get URL with parameters
    let url = 'photos?';
    url += '_page=' + this.pageIndex;
    url += '&_limit=' + this.pageLimit;

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
