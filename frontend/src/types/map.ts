export type MapSettings = {
    latitude: Latitude;
    longitude: Longitude;
    zoom: number;
    pitch: number;
    bearing: number;
    maxZoom: number;
    minZoom: number;
}

type MapBaseEntity<Type extends 'incident' | 'address' | 'result'> = {
    latitude: Latitude;
    longitude: Longitude;
    unom: string;
    address: string;
    type?: Type;
}

export type MapData = {
    latitude: Latitude;
    longitude: Longitude;
    name: string;
    layer: string;
    value: string;
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

export type MapAddress = MapBaseEntity<'address'>;

export type Incident = MapBaseEntity<'incident'>;
