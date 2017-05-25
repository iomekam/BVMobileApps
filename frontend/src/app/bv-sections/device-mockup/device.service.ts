import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, TabID } from './i-device-model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BvImage } from '../shared/bv-image';
import { Bounds } from '../../ng2-img-cropper';
import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ValidationService } from '../shared/validation.service';

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

  private _url = '/api/design/';

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
      tab.extraHeaderDimenHeight = 88;
      tab.extraHeaderDimenWidth = 300;
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
    private _validationService: ValidationService,
    private _sharedService: SharedService) {
    

    this._model = {
      appName: '',
      colors: {
        primary: '#000000',
        secondary: '#009911'
      },
      tabs: [],
      activeTab: null
    };
  }

    public setDataAfterFetch(model: IDeviceModel) {
        for(let t of model.tabs) {
            // Go through the list and add the tabs that have a positive order. This is how we can
            // determine whether the tabs should be shown on the screen
            if(t.order > -1) {
                this.addTab(t.id);
            }
        }

        this._model.colors = model.colors;
        //this._model.appName = model.appName;
    }

    public fetchData() : Observable<IDeviceModel> {
        return this.init();
    }

    public isValid(): boolean {
      return (this._main.headerImage.image !== '' || this._main.order < 0) &&
        (this._main.extraHeaderImage.image !== '' || this._main.order < 0) &&
        (this._video.headerImage.image !== '' || this._video.order < 0) &&
        (this._radio.headerImage.image !== '' || this._radio.order < 0) &&
        (this._music.headerImage.image !== '' || this._music.order < 0) &&
        (this._photo.headerImage.image !== '' || this._photo.order < 0);
    }

    public validate(): void {
        this._validationService.setDesignValid(this.isValid());
    }

    private init(): Observable<IDeviceModel> {
      this._url = this._sharedService.url + this._url + this._sharedService.id;
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

  public getFullModel() {
    return {
      appName: '',
      colors: this._model.colors,
      tabs: [
        this._main,
        this._radio,
        this._photo,
        this._video,
        this._music,
        this._more
      ],
      activeTab: null
    };
  }

  public saveModel() {

    const model = this.getFullModel();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    this._http.put(this._url, JSON.stringify(model), options)
            .takeUntil(this.httpPutUnsubscribe)
            .subscribe(
                data => {
                    console.log(model);
                    this.httpPutUnsubscribe.next();
                    this.httpPutUnsubscribe.complete();
                },
                error => console.log(JSON.stringify(error))
    );
  }

  public setAppName(name: string): void {
    this._model.appName = name;
  }

  public getTab(id: TabID): IDeviceTab {
    if (id == TabID.VIDEO) {
      return this._video;
    }
    else if (id == TabID.MUSIC) {
      return this._music;
    }
    else if (id == TabID.RADIO) {
      return this._radio;
    }
    else if (id == TabID.PHOTO) {
      return this._photo;
    }
    else if (id == TabID.BLOG) {
      return this._main;
    }
    else {
      return this._more;
    }
  }

  public getOrder(id: TabID): number {
    if (id == TabID.VIDEO) {
      return 3;
    }
    else if (id == TabID.MUSIC) {
      return 4;
    }
    else if (id == TabID.RADIO) {
      return 1;
    }
    else if (id == TabID.PHOTO) {
      return 2;
    }
    else if (id == TabID.BLOG) {
      return 0;
    }
    else {
      return 5;
    }
  }

  public addTab(id: TabID): void {
    const tab = this.getTab(id);

    // If all 5 tabs are already being shown, then we want to replace the photo tab with the radio tab.
    if (this._model.tabs.length === 5) {
      this.removeTab(TabID.PHOTO);
    }
    
    if(tab.order < 0) {
      tab.order *= -1;
    }
    
    this._model.tabs.splice(this._model.tabs.length, 0, tab);  
  }

  public removeTab(id: TabID): void {
    const tab = this.getTab(id);

    // If we are removing a tab (not Photos), then we can restore the photo tab
    if (this._model.tabs.length === 5 && id !== TabID.PHOTO) {
        const temp = this._photo.order;
        this._photo.order = tab.order;
        tab.order = temp;
        this.addTab(TabID.PHOTO);
    }

    const index: number = this._model.tabs.findIndex(
        tab => {
            return id === tab.id;
        }
    );

    if (index === -1) { return; }

    if(tab.order > 0) {
      this._model.tabs[index].order *= -1;
    }

    this._model.tabs.splice(index, 1);
  }

  public isTabCreated(id: TabID): boolean {
    const index: number = this._model.tabs.findIndex(
          tab => {
              return id === tab.id;
          }
      );

       return index !== -1;
  }

  public setPrimaryColor(color: string): void {
      this._model.colors['primary'] = color;

      this.validate();
  }

  public setImage(id: TabID, image: BvImage) {
    const tab = this.getTab(id);
    tab.image = image;
    tab.showImage = true;

    this.validate();
  }


  public setHeaderImage(id: TabID, image: BvImage) {
    const tab = this.getTab(id);
    tab.headerImage = image;
    tab.showHeader = true;

    this.validate();
  }

  public setExtraHeaderImage(id: TabID, image: BvImage) {
    const tab = this.getTab(id);
    tab.extraHeaderImage = image;
    this.validate();
  }

  public moveTab(id: TabID, right: TabID) {
      if (this._model.tabs.length > 3 && id != null) {
        // We get the id of the tab as well as what it's right sibling is. Therefore,
        // we will look to see who is on the right before the swap and use that
        // to obtain the proper tab to swap tab.order with

        let items = this._model.tabs.sort(function compare(a: IDeviceTab, b: IDeviceTab): number {
            if (a.order < b.order) {
              return -1;
            }

            if (a.order > b.order) {
              return 1;
            }

            return 0;
        });
        
        const tab = this.getTab(id);
        
        let start = tab.order;
        let end = 6;
        let rightToLeft = false;

        if(right !== null) {
            
            const rightTab = this.getTab(right);

            if (tab.order > rightTab.order) {
              rightToLeft = true;
              start = rightTab.order;
              end = tab.order;
            }
            else {
              end = rightTab.order-1;
            }
        }

        items = items.filter(item => item.order >= start && item.order <= end);

        if(rightToLeft) {
          items = items.reverse();
        }

        let target = this.getTab(items[0].id);

        for(let t of items) {
            const temp = target.order;
            target.order = t.order;
            t.order = temp;
        }
    }
  }

  public setSecondaryColor(color: string): void {
     this._model.colors['secondary'] = color;
  }


}
