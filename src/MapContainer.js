import React, { Component } from 'react'
import MapView from 'react-native-maps'

// import Marker from './components/Marker'
// import Cluster from './components/Cluster'

const MapContainer = (props) => {
	return (
		<MapView {...props} />
	)
}

export default MapContainer