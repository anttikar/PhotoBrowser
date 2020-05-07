export class App {
  configureRouter(config, router) {
    config.title = 'PhotoBrowser';
    config.map([
      { route: ['', 'photos'], name: 'photo-browser', moduleId: 'photo-browser', title: 'Photo Browser' },
      { route: ['photo/:id'], name: 'photo', moduleId: 'photo-viewer', title: 'Photo Viewer'}
    ]);

    this.router = router;
  }

  constructor() {
    // Use App to saved data and state of views
    this.photoBrowserData = {
      photos: [],
      pageIndex: 1,
      scrollPosition: undefined
    };
  }

}
