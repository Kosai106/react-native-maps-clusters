import React, { Component } from 'react'
import MapView from 'react-native-maps'
import GeoJSON from 'geojson'
import supercluster from 'supercluster'

// import Marker from './components/Marker'
import Cluster from './components/Cluster'

const bounds = [
	{ latitude: 85, longitude: 180 },
	{ latitude: 85, longitude: 90 },
	{ latitude: 85, longitude: 0 },
	{ latitude: 85, longitude: -90 },
	{ latitude: 85, longitude: -180 },
	{ latitude: 0, longitude: -180 },
	{ latitude: -85, longitude: -180 },
	{ latitude: -85, longitude: -90 },
	{ latitude: -85, longitude: 0 },
	{ latitude: -85, longitude: 90 },
	{ latitude: -85, longitude: 180 },
	{ latitude: 0, longitude: 180 },
	{ latitude: 85, longitude: 18 }
]

class MapContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
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

	_createRegions() {
		const items = this._createCluster(this.props.markerData).getClusters(bounds, this._getZoomLevel(region))

		this.setState({
			clusters: items
		})
	}

	componentDidMount() {
		this._createRegions()
	}

	render() {
		return (
			this.state.clusters.map((item, i) => {
				const coordinates = item.geometry.coordinates
				const marker = (
					<MapView.Marker
						key={i}
						coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
						pinColor={'red'} />
				)
				const cluster = (
					<Cluster
						key={i}
						item={item} />
				)

				return (
					(item.properties.cluster === true) ? cluster : marker
				)
			})
		)
	}
}

export default MapContainer