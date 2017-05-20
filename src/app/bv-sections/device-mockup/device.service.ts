import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, OrderType, TabID } from './i-device-model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BvImage } from '../shared/bv-image';
import { Bounds } from '../../ng2-img-cropper';
import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../shared/shared.service';

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

  private _url = '/api/design/1'; 

  private httpPutUnsubscribe = new Subject<void>();

  private _activeTabChangedSource: Subject<TabID> = new Subject<TabID>();
  activeTabChanged$ = this._activeTabChangedSource.asObservable();

  getUrl(): string {
      return this._url;
  }

  public setActiveTabChanged(id: TabID) {
    this._activeTabChangedSource.next(id);
  }

  private getDefaultIcon(id: TabID): string {
    let iconString = "";

    if (id == TabID.VIDEO) {
      iconString = "icon ion ion-videocamera";
    }

    if (id == TabID.MUSIC) {
      iconString = "icon ion ion-music-note";
    }

    if (id == TabID.RADIO) {
      iconString = "icon ion ion-radio-waves";
    }

    if (id == TabID.BLOG) {
      iconString = "icon ion ion-home";
    }

    if (id == TabID.MORE) {
      iconString = "icon ion ion-more";
    }

    if (id == TabID.PHOTO) {
      iconString = "icon ion ion-camera";
    }

    return iconString;
  }

  private getHeaderDimmensions(tab: IDeviceTab) {
    if (tab.id === TabID.BLOG) {
      tab.headerDimenHeight = 80;
      tab.headerDimenWidth = 570;
      tab.extraHeaderDimenHeight = 0;
      tab.extraHeaderDimenWidth = 0;
    }
    else if (tab.id === TabID.MUSIC) {
      tab.headerDimenHeight = 302;
      tab.headerDimenWidth = 612;
    }
    else if (tab.id === TabID.RADIO) {
      tab.headerDimenHeight = 600;
      tab.headerDimenWidth = 600;
    }
    else if (tab.id === TabID.PHOTO) {
      tab.headerDimenHeight = 302;
      tab.headerDimenWidth = 612;
    }
    else if (tab.id === TabID.MORE) {
      tab.headerDimenHeight = 302;
      tab.headerDimenWidth = 612;
    }
    else if (tab.id === TabID.VIDEO) {
      tab.headerDimenHeight = 302;
      tab.headerDimenWidth = 612;
    }
  }

  constructor(
    private _http: Http,
    private _sharedService: SharedService) {
    this._photo = {
      id: TabID.PHOTO,
      title: 'Photos',
      orderType: OrderType.ANY,
      order: 2,
      defaultIcon: this.getDefaultIcon(TabID.PHOTO),
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
      defaultIcon: this.getDefaultIcon(TabID.VIDEO),
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
      defaultIcon: this.getDefaultIcon(TabID.MUSIC),
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
      defaultIcon: this.getDefaultIcon(TabID.RADIO),
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
          defaultIcon: this.getDefaultIcon(TabID.BLOG),
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
          headerDimenHeight: 1000,
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
          defaultIcon: this.getDefaultIcon(TabID.MORE),
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

    this._url = this._sharedService.url + this._url;
  }

    public setDataAfterFetch(model: IDeviceModel) {
        this._model = model;

        this._musicValid = this._model.tabs[TabID.MUSIC].order >= 0;
        this._videoValid = this._model.tabs[TabID.VIDEO].order >= 0;
        this._radioValid = this._model.tabs[TabID.RADIO].order >= 0;

    }

    public fetchData() : Observable<IDeviceModel> {
        return this.init();
    }

    private init(): Observable<IDeviceModel> {
        return this._http.get(this._url)
            .map((response: Response) => <IDeviceModel> response.json())
            .do(data => {
                data.activeTab = this._model.activeTab;
                for(let tab of data.tabs) {
                  tab.defaultIcon = this.getDefaultIcon(tab.id);
                  this.getHeaderDimmensions(tab);

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

                    if (tab.id == TabID.VIDEO) {
                      this._video = tab;
                    }

                    if (tab.id == TabID.MUSIC) {
                      this._music = tab;
                    }

                    if (tab.id == TabID.RADIO) {
                      this._radio = tab;
                    }

                    if (tab.id == TabID.BLOG) {
                      this._main = tab;
                    }

                    if (tab.id == TabID.MORE) {
                      this._more = tab;
                    }

                    if (tab.id == TabID.PHOTO) {
                      this._photo = tab;
                    }
                }
            });
    }

  public getModel() {
    return this._model;
  }

  public setModel(model: IDeviceModel) {
    this._model = model;
    
    for(let tab of this._model.tabs) {
      tab.image.originalBase64 = tab.image.original.src;
      tab.headerImage.originalBase64 = tab.headerImage.original.src;
      tab.extraHeaderImage.originalBase64 = tab.extraHeaderImage.original.src;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    this._http.put(this._url, JSON.stringify(this._model), options)
            .takeUntil(this.httpPutUnsubscribe)
            .subscribe(
                data => {
                  
                    this.httpPutUnsubscribe.next();
                    this.httpPutUnsubscribe.complete();
                },
                error => console.log(JSON.stringify(error))
    );
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
    if ((this._videoValid && this._musicValid && this._radioValid) == false && this._photo.order < 0) {
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
    this._model.tabs[id].headerImage = image;
    this._model.tabs[id].showHeader = true;
  }

  public setExtraHeaderImage(id: TabID, image: BvImage) {
    this._model.tabs[id].extraHeaderImage = image;
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
