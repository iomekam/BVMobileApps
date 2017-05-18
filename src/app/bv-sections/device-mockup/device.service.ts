import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, OrderType, TabID } from './i-device-model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BvImage } from '../shared/bv-image';
import { Bounds } from '../../ng2-img-cropper';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'valid',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(items: IDeviceTab[]): any {
        if (!items) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        let item = items.filter(item => item.order >= 0);
        return item.sort(function compare(a: IDeviceTab, b: IDeviceTab): number {
            if (a.order < b.order) {
              return -1;
            }

            if (a.order > b.order) {
              return 1;
            }

            return 0;
        });
    }
}

@Injectable()
export class DeviceService {

  private _model: IDeviceModel;

  private _main: IDeviceTab
  private _photo: IDeviceTab;
  private _music: IDeviceTab;
  private _video: IDeviceTab;
  private _radio: IDeviceTab;
  private _more: IDeviceTab

  private _musicValid = false;
  private _videoValid = false;
  private _radioValid = false;

  private _url = 'http://localhost:7345/api/design/1'; 

  private ngUnsubscribe = new Subject<void>();
  private httpPutUnsubscribe = new Subject<void>();

  private _modelInit = new Subject<IDeviceModel>();
  private _init = false;

  constructor(private _http: Http) {
    this._photo = {
      id: TabID.PHOTO,
      title: 'Photos',
      orderType: OrderType.ANY,
      order: 2,
      defaultIcon: 'icon ion ion-camera',
      image: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showTitle: true,
      showImage: false,
      headerImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showHeader: false,
      headerDimenHeight: 302,
      headerDimenWidth: 612,
      hasExtraHeader: false,
      extraHeaderImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      extraHeaderDimenHeight: 0,
      extraHeaderDimenWidth: 0,
      hasHeader: true
    };

    this._video = {
      id: TabID.VIDEO,
      defaultIcon: 'icon ion ion-videocamera',
      title: 'Videos',
      orderType: OrderType.ANY,
      order: -1,
      image: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showTitle: true,
      showImage: false,
      headerImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showHeader: false,
      headerDimenHeight: 302,
      headerDimenWidth: 612,
      hasExtraHeader: false,
      extraHeaderImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      extraHeaderDimenHeight: 0,
      extraHeaderDimenWidth: 0,
      hasHeader: true
    };

    this._music = {
      id: TabID.MUSIC,
      defaultIcon: 'icon ion ion-music-note',
      title: 'Music',
      orderType: OrderType.ANY,
      order: -1,
      image: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showTitle: true,
      showImage: false,
      headerImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showHeader: false,
      headerDimenHeight: 302,
      headerDimenWidth: 612,
      hasExtraHeader: false,
      extraHeaderImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      extraHeaderDimenHeight: 0,
      extraHeaderDimenWidth: 0,
      hasHeader: true
    };

    this._radio = {
      id: TabID.RADIO,
      defaultIcon: 'icon ion ion-radio-waves',
      title: 'Radio',
      orderType: OrderType.ANY,
      order: -1,
      image: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showTitle: true,
      showImage: false,
      headerImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      showHeader: false,
      headerDimenHeight: 302,
      headerDimenWidth: 612,
      hasExtraHeader: false,
      extraHeaderImage: {
          original: new Image(),
          originalBase64: '',
          image: '',
          bounds: new Bounds()
      },
      extraHeaderDimenHeight: 0,
      extraHeaderDimenWidth: 0,
      hasHeader: true
    };

    this._main = {
          id: TabID.BLOG,
          title: 'Main',
          orderType: OrderType.FIRST,
          order: 0, // Since we specify FIRST, the order doesn't matter.
          defaultIcon: 'icon ion ion-home',
          image: {
              original: new Image(),
              originalBase64: '',
              image: '',
              bounds: new Bounds()
          },
          showTitle: true,
          showImage: false,
          headerImage: {
              original: new Image(),
              originalBase64: '',
              image: '',
              bounds: new Bounds()
          },
          showHeader: false,
          headerDimenHeight: 302,
          headerDimenWidth: 612,
          hasExtraHeader: true,
          extraHeaderImage: {
            original: new Image(),
            originalBase64: '',
            image: '',
            bounds: new Bounds()
          },
          extraHeaderDimenHeight: 88,
          extraHeaderDimenWidth: 300,
          hasHeader: true
        };

    this._more = {
          id: TabID.MORE,
          title: 'More',
          orderType: OrderType.LAST,
          order: 4, // Since we specify LAST, the order doesn't matter.
          defaultIcon: 'icon ion ion-more',
          image: {
              original: new Image(),
              originalBase64: '',
              image: '',
              bounds: new Bounds()
          },
          showTitle: true,
          showImage: false,
          headerImage: {
              original: new Image(),
              originalBase64: '',
              image: '',
              bounds: new Bounds()
          },
          showHeader: false,
          headerDimenHeight: 88,
          headerDimenWidth: 570,
          hasExtraHeader: false,
          extraHeaderImage: {
            original: new Image(),
            originalBase64: '',
            image: '',
            bounds: new Bounds()
          },
          extraHeaderDimenHeight: 0,
          extraHeaderDimenWidth: 0,
          hasHeader: false
        };

    this._model = {
      appName: '',
      colors: {
        primary: '#000000',
        secondary: '#0099ff'
      },
      tabs: [
        this._main,
        this._video,
        this._radio,
        this._music,
        this._photo,
        this._more,
      ],
      activeTab: null
    };

    this._model.tabs[TabID.BLOG] = this._main;
    this._model.tabs[TabID.VIDEO] = this._video;
    this._model.tabs[TabID.RADIO] = this._radio;
    this._model.tabs[TabID.MUSIC] = this._music;
    this._model.tabs[TabID.PHOTO] = this._photo;
    this._model.tabs[TabID.MORE] = this._more;
 
    this.init().takeUntil(this.ngUnsubscribe)
            .subscribe(
                model => {
                //this._model = model;
                this._init = true;
                //this._modelInit.next(this._model);
                console.log(model);
                //this.ngUnsubscribe.next();
                //this.ngUnsubscribe.complete();
            }
        );
  }

  private init(): Observable<IDeviceModel> {
        return this._http.get(this._url)
            .map((response: Response) => <IDeviceModel> response.json())
            .do(data => {
                for(let tab of data.tabs) {
                  let image = new Image();
                  image.src = tab.headerImage.originalBase64;

                  tab.headerImage = {
                      original: image,
                      originalBase64: tab.headerImage.originalBase64,
                      image: tab.headerImage.image,
                      bounds: new Bounds(tab.headerImage.bounds.left, tab.headerImage.bounds.top, tab.headerImage.bounds.right - tab.headerImage.bounds.left, tab.headerImage.bounds.bottom - tab.headerImage.bounds.top)
                    };

                    image = new Image();
                    image.src = tab.extraHeaderImage.originalBase64;

                    tab.extraHeaderImage = {
                      original: image,
                      originalBase64: tab.extraHeaderImage.originalBase64,
                      image: tab.extraHeaderImage.image,
                      bounds: new Bounds(tab.extraHeaderImage.bounds.left, tab.extraHeaderImage.bounds.top, tab.extraHeaderImage.bounds.right - tab.extraHeaderImage.bounds.left, tab.extraHeaderImage.bounds.bottom - tab.extraHeaderImage.bounds.top)
                    };

                    image = new Image();
                    image.src = tab.image.originalBase64;

                    tab.image = {
                      original: image,
                      originalBase64: tab.image.originalBase64,
                      image: tab.image.image,
                      bounds: new Bounds(tab.image.bounds.left, tab.image.bounds.top, tab.image.bounds.right - tab.image.bounds.left, tab.image.bounds.bottom - tab.image.bounds.top)
                    };
                }
            });
    }

  getDefaultModel(): IDeviceModel {
    return this._model;
  }

  public getModel(): Observable<IDeviceModel> {
    if (!this._init) {
        this._modelInit.next(this._model);
        return this._modelInit.asObservable();
    }
    else {
        return Observable.of(this._model);
    }
  }

  public setAppName(name: string): void {
    this._model.appName = name;
  }

  public addTab(tab: IDeviceTab): void {
    if (tab.id == TabID.VIDEO) {
      this._video = tab;
      this._videoValid = true;
      this._model.tabs[TabID.VIDEO] = this._video;
    }
    
    if (tab.id == TabID.RADIO) {
      this._radio = tab;
      this._radioValid = true;
      this._model.tabs[TabID.RADIO] = this._radio;
    }

    if (tab.id == TabID.MUSIC) {
      this._music = tab;
      this._musicValid = true;
      this._model.tabs[TabID.MUSIC] = this._music;
    }

    if (this._videoValid && this._musicValid && this._radioValid) {
        this.removeTab(TabID.PHOTO);
    }
    else if (tab.id == TabID.PHOTO) {
      this._photo.order = 2;
      this._model.tabs[TabID.PHOTO] = this._photo;
    }
  }

  public removeTab(id: TabID): void {
    if (id == TabID.VIDEO) {
      this._video.order = -1;
      this._videoValid = false;
    }

    if (id == TabID.MUSIC) {
      this._music.order = -1;
      this._musicValid = false;
    }

    if (id == TabID.RADIO) {
      this._radio.order = -1;
      this._radioValid = false;
    }

    // If we are removing a tab (not Photos), then we can restore the photo tab
    if ((this._videoValid && this._musicValid && this._radioValid) == false) {
        this.addTab(this._photo);
    }
    else {
      if (id == TabID.PHOTO) {
        this._photo.order = -1;
      }
    }
  }

  public isTabCreated(id: TabID): boolean {
    let isValid = false;

    if (id == TabID.VIDEO) {
      isValid = this._videoValid;
    }
    
    if (id == TabID.RADIO) {
      isValid = this._radioValid;
    }

    if (id == TabID.MUSIC) {
      isValid = this._musicValid;
    }

    return isValid;
  }

  public setPrimaryColor(color: string): void {
      this._model.colors['primary'] = color;
  }

  public setImage(id: TabID, image: BvImage) {
    const index: number = this._model.tabs.findIndex(
      tab => {
        return (id + '') === (tab.id + '');
      }
    );

    if (index === -1) { return; }

    this._model.tabs[index].image = image;
    this._model.tabs[index].showImage = true;
  }


  public setHeaderImage(id: TabID, image: BvImage) {
    const index: number = this._model.tabs.findIndex(
      tab => {
        return (id + '') === (tab.id + '');
      }
    );

    if (index === -1) { return; }

    this._model.tabs[index].headerImage = image;
    this._model.tabs[index].showHeader = true;

    this._model.activeTab = this._model.tabs[index];
  }

  public setExtraHeaderImage(id: TabID, image: BvImage) {
    const index: number = this._model.tabs.findIndex(
      tab => {
        return (id + '') === (tab.id + '');
      }
    );

    if (index === -1) { return; }

    this._model.tabs[index].extraHeaderImage = image;

    this._model.activeTab = this._model.tabs[index];
  }


  public moveTab(id: TabID, before: TabID) {
      if (this._model.tabs.length > 3 && id != null) {

        let end: number;
        if (before != null) {
          const indexEnd: number = this._model.tabs.findIndex(
            tab => {

              return (before + '') === (tab.id + '');
            }
          );

          end = indexEnd;
        }
        else {
          end = this._model.tabs.length - 1;
        }

        const indexStart: number = this._model.tabs.findIndex(
          tab => {

            return (id + '') === (tab.id + '');
          }
        );

        const removetab = this._model.tabs[indexStart];

        const tempOrder = this._model.tabs[end].order;
        this._model.tabs[end].order = this._model.tabs[indexStart].order;
        this._model.tabs[indexStart].order = tempOrder;


        if (indexStart < end) {
          this._model.tabs.splice(end, 0, removetab);
          this._model.tabs.splice(indexStart, 1);
        }
        else {
          this._model.tabs.splice(indexStart, 1);
          this._model.tabs.splice(end, 0, removetab);
        }
      }
  }

  public setSecondaryColor(color: string): void {
     this._model.colors['secondary'] = color;
  }


}
