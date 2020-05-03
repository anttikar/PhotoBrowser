export class App {
  configureRouter(config, router) {
    config.title = 'PhotoBrowser';
    config.map([
      { route: ['', 'photo-browser'], name: 'photo-browser', moduleId: 'photo-browser', nav: true, title: 'Photo Browser' }
    ]);

    this.router = router;
  }
}
