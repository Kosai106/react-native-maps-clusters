import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView from 'react-native-maps'

const Marker = (props) => {
	const { item, color, children } = this.props
	const { price, currency } = item.properties
	const coords = item.geometry.coordinates

	return (
		<MapView.Marker
			coordinate={{ latitude: coords[1], longitude: coords[0] }}
			width={40}
			height={36.5}
			anchor={{ x: 0.5, y: 0.75 }}
			calloutOffset={{ x: 100, y: 50 }}
			calloutAnchor={{ x: 0.5, y: 0 }}
			activeOpacity={0.8}>
			<View style={[styles.marker, { backgroundColor: color }]}>
				<Text numberOfLines={1} style={styles.markerText}>
					{currency}{price}
				</Text>
			</View>
			<View style={[styles.pointer, { backgroundColor: color }]} />
			<MapView.Callout tooltip style={styles.tooltip}>
				{children}
			</MapView.Callout>
		</MapView.Marker>
	)
}

const styles = StyleSheet.create({
	marker: {
		position: 'relative',
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 4,
		borderRadius: 2,
	},
	markerText: {
		fontSize: 12,
		color: '#FFFFFF',
	},
	pointer: {
		width: 10,
		height: 10,
		backgroundColor: '#000000',
		alignSelf: 'center',
		transform: [{ rotate: '45deg' }],
		top: -6,
	},
	tooltip: {
		flexDirection: 'column',
	},
})

Marker.defaultProps = {
	color: '#000000'
}

export default Marker
