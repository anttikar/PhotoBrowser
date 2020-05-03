export class App {
  configureRouter(config, router) {
    config.title = 'PhotoBrowser';
    config.map([
      { route: ['', 'photo-browser'], name: 'photo-browser', moduleId: 'photo-browser', title: 'Photo Browser' },
      { route: ['photo-viewer/:id'], name: 'photo-viewer', moduleId: 'photo-viewer', title: 'Photo Viewer', href:'#photo'}
    ]);

    this.router = router;
  }
}
