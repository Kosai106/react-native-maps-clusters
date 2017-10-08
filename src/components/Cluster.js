import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const Cluster = ({ item, color }) => {
	const { point_count, cluster_id } = item.properties
	const coordinates = item.geometry.coordinates

	return (
		<MapView.Marker
			coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
			width={41}
			height={41}
			anchor={{ x: 0.5, y: 0.5 }}
		>
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
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cluster: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clusterText: {
		fontSize: 12,
		color: 'white',
	},
})

Cluster.defaultProps = {
	color: '0,0,0'
}

export default Cluster
