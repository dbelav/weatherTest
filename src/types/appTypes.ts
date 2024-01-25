export interface CurrentLocation {
    latitude: null | number;
    longitude: null | number;
}

export interface AppState {
    currentLocation: CurrentLocation;
    language: string
}