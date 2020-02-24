import React, { Component } from 'react'
import GeoJSON from 'geojson'
import supercluster from 'supercluster'

import Map from './components/Map'
import Marker from './components/Marker'
import Cluster from './components/Cluster'

const initialRegion = {
	latitude: 55.676098,
	longitude: 12.568337,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
}

let northeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}, southwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}, northwest = {
	latitude: initialRegion.latitude - initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude + initialRegion.longitudeDelta / 2,
}, southeast = {
	latitude: initialRegion.latitude + initialRegion.latitudeDelta / 2,
	longitude: initialRegion.longitude - initialRegion.longitudeDelta / 2,
}

class MapView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			clusters: []
		}
	}

	_createCluster(data) {
		const items = GeoJSON.parse(data, { Point: ['latitude', 'longitude'] })
		const cluster = supercluster({ radius: 60, maxZoom: 16, nodeSize: 64 })
		cluster.load(items.features)
		return cluster;
	}

	_getZoomLevel(region) {
		const angle = region.longitudeDelta;
		const level = Math.round(Math.log(360 / angle) / Math.LN2);
		return level;
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

	onRegionChangeComplete(region) {
		northeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2,
		}
		southwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2,
		}
		northwest = {
			latitude: region.latitude - region.latitudeDelta / 2,
			longitude: region.longitude + region.longitudeDelta / 2,
		}
		southeast = {
			latitude: region.latitude + region.latitudeDelta / 2,
			longitude: region.longitude - region.longitudeDelta / 2,
		}
		this._createRegions(region)
	}

	render() {
		const { clusters } = this.state
		return (
			<Map
				initialRegion={initialRegion}
				{...this.props}
				onRegionChangeComplete={(x) => { this.onRegionChangeComplete(x) }}>
				{clusters.map((item, i) => (item.properties.cluster === true)
					? <Cluster key={i} item={item} />
					: <Marker key={i} item={item} />
				)}
			</Map>
		)
	}
}

export default MapView
