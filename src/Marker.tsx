import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

import * as types from './types';

const styles = StyleSheet.create({
  marker: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 2,
  },
  markerText: {
    fontSize: 12,
    color: 'white',
  },
  pointer: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    transform: [{ rotate: '45deg' }],
    top: -6,
  },
});

export interface CustomMarkerProps {
  item: types.Marker<{ currency: string; price: number }>;
  color?: ViewStyle['backgroundColor'];
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  item,
  color = 'black',
  children,
  ...props
}) => {
  const { price, currency } = item.properties;
  const [latitude, longitude] = item.geometry.coordinates;

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      anchor={{ x: 0.5, y: 0.75 }}
      calloutOffset={{ x: 100, y: 50 }}
      calloutAnchor={{ x: 0.5, y: 0 }}
      opacity={0.8}
      {...props}
    >
      <View style={[styles.marker, { backgroundColor: color }]}>
        <Text numberOfLines={1} style={[styles.markerText]}>
          {currency}
          {price}
        </Text>
      </View>
      <View style={[styles.pointer, { backgroundColor: color }]} />
      <Callout tooltip style={{ flexDirection: 'column' }}>
        {children}
      </Callout>
    </Marker>
  );
};

export default CustomMarker;
