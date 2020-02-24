import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const iconOuterSize = 40
const iconInnerSize = iconOuterSize - 10
const markerSize = iconOuterSize + 1

const Cluster = (props) => {
	const { item, color } = props
	const { point_count, cluster_id } = item.properties
	const coordinates = item.geometry.coordinates

	return (
		<MapView.Marker
			coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
			width={markerSize}
			height={markerSize}
			anchor={{ x: 0.5, y: 0.5 }}>
			<View style={[styles.clusterOuter, { backgroundColor: `rgba(${color}, 0.25)` }]}>
				<View style={[styles.cluster, { backgroundColor: `rgb(${color})` }]}>
					<Text style={styles.clusterText}>
						{point_count}
					</Text>
				</View>
			</View>
		</MapView.Marker>
	)
}

const styles = StyleSheet.create({
	clusterOuter: {
		width: iconOuterSize,
		height: iconOuterSize,
		borderRadius: iconOuterSize / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cluster: {
		width: iconInnerSize,
		height: iconInnerSize,
		borderRadius: iconInnerSize / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clusterText: {
		fontSize: 12,
		color: '#FFFFFF',
	},
})

Cluster.defaultProps = {
	color: '0,0,0'
}

export default Cluster
