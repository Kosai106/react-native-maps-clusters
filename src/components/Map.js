import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

const { width, height } = Dimensions.get('window')

const Map = (props) => {
	return (
		<MapView {...props} style={[props.style, styles.container]}>
			{props.children}
		</MapView>
	)
}

const styles = StyleSheet.create({
	container: {
		height: height,
		width: width,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Map
