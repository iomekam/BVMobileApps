import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, OrderType, TabID } from './i-device-model';
import { Subject } from 'rxjs/Subject';

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
      image: '',
      showTitle: true
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
          image: '',
          showTitle: true
        },
        this._photo,
        {
          id: TabID.MORE,
          title: 'More',
          orderType: OrderType.LAST,
          order: 5, // Since we specify LAST, the order doesn't matter.
          defaultIcon: 'icon ion ion-more',
          image: '',
          showTitle: true
        },
      ]
    };
  }

  public getModel(): IDeviceModel {
    return this._model;
  }

  public setAppName(name: string): void {
    this._model.appName = name;
  }

  public addTab(tab: IDeviceTab): void {
    // If all 5 tabs are already being shown, then we want to replace the photo tab with the radio tab.
    if (this._model.tabs.length === 5) {
      this.removeTab(TabID.PHOTO);
    }

    this._model.tabs.push(tab);
  }

  public removeTab(id: TabID): void {
    // If we are removing a tab (not Photos), then we can restore the photo tab
    if (this._model.tabs.length === 5 && id !== TabID.PHOTO) {
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

  public setSecondaryColor(color: string): void {
     this._model.colors['secondary'] = color;
  }
}
