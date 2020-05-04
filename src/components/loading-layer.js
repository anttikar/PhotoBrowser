import {bindable, customElement} from 'aurelia-framework';

@customElement('loading-layer')
export class LoadingLayer {
  constructor() {
    this.pleaseWaitMessage = 'Please wait';
  }
}
