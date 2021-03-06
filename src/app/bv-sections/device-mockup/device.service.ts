import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, OrderType, TabID } from './i-device-model';
import { Observable } from 'rxjs/Observable';
import { BvImage } from '../shared/bv-image';
import { Bounds } from '../../ng2-img-cropper';

@Injectable()
export class DeviceService {

  private _model: IDeviceModel;

  private _photo: IDeviceTab;

  constructor() {
    this._photo = {
      id: TabID.PHOTO,
      title: 'Photos',
      orderType: OrderType.ANY,
      order: 2,
      defaultIcon: 'icon ion ion-camera',
      image: {
          original: new Image(),
          image: '',
          bounds: new Bounds()
      },
      showTitle: true,
      showImage: false,
      headerImage: {
          original: new Image(),
          image: '',
          bounds: new Bounds()
      },
      showHeader: false,
      headerDimenHeight: 302,
      headerDimenWidth: 612,
      hasExtraHeader: false,
      extraHeaderImage: {
        original: new Image(),
          image: '',
          bounds: new Bounds()
      },
      extraHeaderDimenHeight: 0,
      extraHeaderDimenWidth: 0,
      hasHeader: true
    };

    this._model = {
      appName: '',
      colors: {
        primary: '#000000',
        secondary: '#0099ff'
      },
      tabs: [
        {
          id: TabID.BLOG,
          title: 'Main',
          orderType: OrderType.FIRST,
          order: -1, // Since we specify FIRST, the order doesn't matter.
          defaultIcon: 'icon ion ion-home',
          image: {
              original: new Image(),
              image: '',
              bounds: new Bounds()
          },
          showTitle: true,
          showImage: false,
          headerImage: {
              original: new Image(),
              image: '',
              bounds: new Bounds()
          },
          showHeader: false,
          headerDimenHeight: 88,
          headerDimenWidth: 570,
          hasExtraHeader: true,
          extraHeaderImage: {
            original: new Image(),
            image: '',
            bounds: new Bounds()
          },
          extraHeaderDimenHeight: 88,
          extraHeaderDimenWidth: 300,
          hasHeader: true
        },
        this._photo,
        {
          id: TabID.MORE,
          title: 'More',
          orderType: OrderType.LAST,
          order: 5, // Since we specify LAST, the order doesn't matter.
          defaultIcon: 'icon ion ion-more',
          image: {
              original: new Image(),
              image: '',
              bounds: new Bounds()
          },
          showTitle: true,
          showImage: false,
          headerImage: {
              original: new Image(),
              image: '',
              bounds: new Bounds()
          },
          showHeader: false,
          headerDimenHeight: 88,
          headerDimenWidth: 570,
          hasExtraHeader: false,
          extraHeaderImage: {
            original: new Image(),
            image: '',
            bounds: new Bounds()
          },
          extraHeaderDimenHeight: 0,
          extraHeaderDimenWidth: 0,
          hasHeader: false
        },
      ],
      activeTab: null
    };
  }

  getDefaultModel(): IDeviceModel {
    return this._model;
  }

  public getModel(): Observable<IDeviceModel> {
    return Observable.of(this._model);
  }

  public setAppName(name: string): void {
    this._model.appName = name;
  }

  public addTab(tab: IDeviceTab): void {
    // If all 5 tabs are already being shown, then we want to replace the photo tab with the radio tab.
    if (this._model.tabs.length === 5) {
      this.removeTab(TabID.PHOTO);
    }

    let index = 0;

    for(let t of this._model.tabs) {
        index++;
        if (t.order < tab.order) {
          this._model.tabs.splice(index+1, 0, tab);
          return;
        }
    }
  }

  public removeTab(id: TabID): void {
    // If we are removing a tab (not Photos), then we can restore the photo tab
    if (this._model.tabs.length === 5 && id !== TabID.PHOTO) {
      console.log(this._model.tabs);
        this.addTab(this._photo);
    }

    const index: number = this._model.tabs.findIndex(
        tab => {
            return id === tab.id;
        }
    );

    if (index === -1) { return; }

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
