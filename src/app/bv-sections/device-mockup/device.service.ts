import { Injectable } from '@angular/core';
import { IDeviceModel, IDeviceTab, OrderType, TabID } from './i-device-model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DeviceService {

  private _model: IDeviceModel;

  private _appNameUpdatedSource: Subject<string> = new Subject<string>();
  appNameUpdated$ = this._appNameUpdatedSource.asObservable();

  private _primaryColorUpdatedSource: Subject<string> = new Subject<string>();
  primaryColorUpdated$ = this._primaryColorUpdatedSource.asObservable();

  private _secondaryColorUpdatedSource: Subject<string> = new Subject<string>();
  _secondaryColorUpdated$ = this._secondaryColorUpdatedSource.asObservable();

  constructor() {
      this._model = {
        appName: '',
        primaryColor: '#000000',
        secondaryColor: '#0099ff',
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
    this._appNameUpdatedSource.next(name);
  }

  public addTab(tab: IDeviceTab): void {
    this._model.tabs.push(tab);
  }

  public removeTab(id: TabID): void {
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
      this._model.primaryColor = color;
      this._primaryColorUpdatedSource.next(color);
  }

  public setSecondaryColor(color: string): void {
      this._model.secondaryColor = color;
      this._secondaryColorUpdatedSource.next(color);
  }
}
