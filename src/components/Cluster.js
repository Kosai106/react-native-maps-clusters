import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const Cluster = ({
	item
}) => {
	const { point_count, cluster_id } = item.properties
	const coordinates = item.geometry.coordinates

	clusterColor = (amount) => {
		//TODO:
		// I really wanted this as a switch statement, but for whatever reason that simply refused to work.
		if (amount === null || undefined) {
			return 'hotpink'
		} else if (amount >= 50) {
			return 'red'
		} else if (amount >= 20) {
			return 'orange'
		} else if (amount >= 0) {
			return 'blue'
		}
		return 'black'
	}

	return (
		<MapView.Marker
			coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
			width={31}
			height={31}
			anchor={{ x: 0.5, y: 0.5 }}
		>
			<View style={[styles.cluster, { backgroundColor: clusterColor(point_count) }]}>
				<Text style={styles.clusterText}>
					{point_count}
				</Text>
			</View>
		</MapView.Marker>
	)
}

const styles = StyleSheet.create({
	cluster: {
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	clusterText: {
		color: 'white',
	},
})

export default Cluster