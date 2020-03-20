import React from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import GeoJSON from 'geojson';
import Supercluster from 'supercluster';

import Cluster from './Cluster';
import Marker from './Marker';

import * as types from './types';

const INITIAL_REGION = {
  latitude: 55.676098,
  longitude: 12.568337,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export interface MapProps extends MapViewProps {
  data: any;
  minZoom?: number;
  maxZoom?: number;
  radius?: number;
  extent?: number;
  nodeSize?: number;
}

export const Map: React.FC<MapProps> = ({
  children,
  data,
  radius = 40,
  minZoom = 0,
  maxZoom = 16,
  extent = 512,
  nodeSize = 64,
  ...props
}) => {
  const [clusters, setClusters] = React.useState<
    types.Marker<{
      cluster: boolean;
      point_count: number;
      currency: string;
      price: number;
    }>[]
  >([]);
  const [area, setArea] = React.useState<{
    northEast: types.Area;
    southWest: types.Area;
    southEast: types.Area;
    northWest: types.Area;
  }>({
    northEast: {
      latitude: INITIAL_REGION.latitude + INITIAL_REGION.latitudeDelta / 2,
      longitude: INITIAL_REGION.longitude + INITIAL_REGION.longitudeDelta / 2,
    },
    southWest: {
      latitude: INITIAL_REGION.latitude - INITIAL_REGION.latitudeDelta / 2,
      longitude: INITIAL_REGION.longitude - INITIAL_REGION.longitudeDelta / 2,
    },
    southEast: {
      latitude: INITIAL_REGION.latitude + INITIAL_REGION.latitudeDelta / 2,
      longitude: INITIAL_REGION.longitude - INITIAL_REGION.longitudeDelta / 2,
    },
    northWest: {
      latitude: INITIAL_REGION.latitude - INITIAL_REGION.latitudeDelta / 2,
      longitude: INITIAL_REGION.longitude + INITIAL_REGION.longitudeDelta / 2,
    },
  });

  const clusterIndex = new Supercluster({
    radius,
    minZoom,
    maxZoom,
    extent,
    nodeSize,
  });

  const createCluster = (data: any) => {
    const items = GeoJSON.parse(data, { Point: ['latitude', 'longitude'] });

    clusterIndex.load(items.features);
    return clusterIndex;
  };

  const getZoomLevel = (latitudeDelta: number) =>
    Math.round(Math.log(360 / latitudeDelta) / Math.LN2);

  const createRegions = (region: types.Region) => {
    const items = createCluster(data).getClusters(
      [
        area.southWest.longitude,
        area.southWest.latitude,
        area.northEast.longitude,
        area.northEast.latitude,
      ],
      getZoomLevel(region.latitudeDelta)
    );

    setClusters(items);
  };

  const onRegionChangeComplete = (region: types.Region) => {
    setArea({
      northEast: {
        latitude: region.latitude + region.latitudeDelta / 2,
        longitude: region.longitude + region.longitudeDelta / 2,
      },
      southWest: {
        latitude: region.latitude - region.latitudeDelta / 2,
        longitude: region.longitude - region.longitudeDelta / 2,
      },
      southEast: {
        latitude: region.latitude + region.latitudeDelta / 2,
        longitude: region.longitude - region.longitudeDelta / 2,
      },
      northWest: {
        latitude: region.latitude - region.latitudeDelta / 2,
        longitude: region.longitude + region.longitudeDelta / 2,
      },
    });
    createRegions(region);
  };

  return (
    <MapView
      initialRegion={INITIAL_REGION}
      onRegionChangeComplete={newRegion => onRegionChangeComplete(newRegion)}
      {...props}
    >
      {clusters.map((item: any, index: number) =>
        item.properties.cluster ? (
          <Cluster key={index} item={item} />
        ) : (
          <Marker key={index} item={item} />
        )
      )}
      {children}
    </MapView>
  );
};

export default Map;
