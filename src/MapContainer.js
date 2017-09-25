import React, { Component } from 'react'
import MapView from 'react-native-maps'
import GeoJSON from 'geojson'
import supercluster from 'supercluster'

// import Marker from './components/Marker'
// import Cluster from './components/Cluster'

const initialRegion = {
	latitude: 55.676098,
	longitude: 12.568337,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
}

let northeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}
let southwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}
let northwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}
let southeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}

class MapContainer extends Component {
	constructor(props) {
		super(props)
		state = {
			clusters: []
		}
	}

	_createCluster(data) {
		const items = GeoJSON.parse(data, { Point: ['latitude', 'longitude'] })
		const cluster = supercluster({
			radius: 60,
			maxZoom: 16,
			nodeSize: 256
		})
		cluster.load(items.features)
		return cluster;
	}

	_getZoomLevel(region) {
		return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
	}

	_createRegions(region) {
		const items = this._createCluster(this.props.data).getClusters([
			southwest.longitude,
			southwest.latitude,
			northeast.longitude,
			northeast.latitude
		], this._getZoomLevel(region))
		this.setState({
			clusters: items
		})
	}

	render() {
		return (
			<MapView {...this.props}>
				{
					this.state.clusters.map((item, i) => {
						const coordinates = item.geometry.coordinates
						const latlng = { latitude: coordinates[1], longitude: coordinates[0] }
						const marker = (
							<MapView.Marker
								coordinate={latlng}
								pinColor={'red'} />
						)
						const cluster = (
							<MapView.Marker
								coordinate={latlng}
								pinColor={'lightblue'} />
						)

						return (
							(item.properties.cluster === true) ? cluster : marker
						)
					})
				}
			</MapView>
		)
	}
}

export default MapContainer