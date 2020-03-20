export type Area = {
  latitude: number;
  longitude: number;
};

export type Region = Area & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Marker<T> = {
  properties: T;
  geometry: {
    coordinates: [number, number];
  };
};
