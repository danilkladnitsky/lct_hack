export type MapSettings = {
    latitude: Latitude;
    longitude: Longitude;
    zoom: number;
    pitch: number;
    bearing: number;
    maxZoom: number;
    minZoom: number;
}

export type MapData = {
    latitude: Latitude;
    longitude: Longitude;
    name: string;
    layer: string;
}

export type MapObject = {
    position: [Longitude, Latitude];
    points: MapTooltipObject[];
}

export type MapTooltipObject = {
    index: number;
    screenCoord: [number, number];
    source: MapData;
}
