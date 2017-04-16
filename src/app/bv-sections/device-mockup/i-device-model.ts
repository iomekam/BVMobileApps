export interface IDeviceModel {
    appName: string;
    colors: any;
    tabs: IDeviceTab[];
    activeTab: IDeviceTab;
}

// Enum we use to order the tab. There can only be one FIRST and one LAST.
// A order type of ANY means that the order doesn't matter. In the case, differ to the
// numerical order value
export enum OrderType {
    FIRST,
    LAST,
    ANY
}

// Represents the type of tab.
export enum TabID {
    PHOTO,
    MUSIC,
    VIDEO,
    RADIO,
    BLOG,
    MORE,
    COLOR,
}

export interface IDeviceTab {
    id: TabID;
    title: string;
    orderType: OrderType;
    order: number;
    defaultIcon: string;
    image: string;
    showTitle: boolean;
    showImage: boolean;
    headerImage: string;
    showHeader: boolean;
}
