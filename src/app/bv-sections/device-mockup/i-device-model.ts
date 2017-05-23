import { BvImage } from '../shared/bv-image';

export interface IDeviceModel {
    appName: string;
    colors: any;
    tabs: IDeviceTab[];
    activeTab: IDeviceTab;
}

// Represents the type of tab.
export enum TabID {
    BLOG,
    PHOTO,
    MUSIC,
    VIDEO,
    RADIO,
    MORE,
    COLOR
}

export interface IDeviceTab {
    id: TabID;
    title: string;
    order: number;
    defaultIcon: string;
    image: BvImage;
    showTitle: boolean;
    showImage: boolean;
    headerImage: BvImage;
    showHeader: boolean;
    headerDimenHeight: number;
    headerDimenWidth: number;
    hasExtraHeader: boolean;
    extraHeaderImage: BvImage;
    extraHeaderDimenHeight: number;
    extraHeaderDimenWidth: number;
    hasHeader: boolean;
}
