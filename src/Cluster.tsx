import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Marker } from 'react-native-maps';

import * as types from './types';

const styles = StyleSheet.create({
  outer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
});

export interface ClusterProps {
  item: types.Marker<{ point_count: number }>;
  color?: ViewStyle['backgroundColor'];
}

export const Cluster: React.FC<ClusterProps> = ({
  item,
  color = 'black',
  ...props
}) => {
  const { point_count } = item.properties;
  const [latitude, longitude] = item.geometry.coordinates;

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      anchor={{ x: 0.5, y: 0.5 }}
      {...props}
    >
      <View style={[styles.outer, { backgroundColor: `rgba(${color}, 0.25)` }]}>
        <View style={[styles.inner, { backgroundColor: `rgb(${color})` }]}>
          <Text style={styles.text}>{point_count}</Text>
        </View>
      </View>
    </Marker>
  );
};

export default Cluster;
