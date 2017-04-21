"use strict";
// Enum we use to order the tab. There can only be one FIRST and one LAST.
// A order type of ANY means that the order doesn't matter. In the case, differ to the
// numerical order value
(function (OrderType) {
    OrderType[OrderType["FIRST"] = 0] = "FIRST";
    OrderType[OrderType["LAST"] = 1] = "LAST";
    OrderType[OrderType["ANY"] = 2] = "ANY";
})(exports.OrderType || (exports.OrderType = {}));
var OrderType = exports.OrderType;
// Represents the type of tab.
(function (TabID) {
    TabID[TabID["PHOTO"] = 0] = "PHOTO";
    TabID[TabID["MUSIC"] = 1] = "MUSIC";
    TabID[TabID["VIDEO"] = 2] = "VIDEO";
    TabID[TabID["RADIO"] = 3] = "RADIO";
    TabID[TabID["BLOG"] = 4] = "BLOG";
    TabID[TabID["MORE"] = 5] = "MORE";
    TabID[TabID["COLOR"] = 6] = "COLOR";
})(exports.TabID || (exports.TabID = {}));
var TabID = exports.TabID;
