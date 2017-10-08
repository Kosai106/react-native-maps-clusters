# React-Native-Maps-Clusters [![Build Status](https://travis-ci.org/Kosai106/react-native-maps-cluster.svg?branch=master)](https://travis-ci.org/Kosai106/react-native-maps-cluster)

__Note:__ Rewrite all of this to actually be useful

## Prerequisites
```bash
npm install react-native-maps supercluster geojson --save
```

## Installation:
```bash
npm install https://github.com/Kosai106/react-native-maps-clusters --save
```

## Usage:
```jsx
import MapView from 'react-native-maps-clusters';

const data = [
  { id: 1, currency: '€', price: 123, latitude: 55.6732765, longitude: 12.5670903 },
  { id: 2, currency: '$', price: 69, latitude: 55.6839255, longitude: 12.5576476 },
  { id: 3, currency: '£', price: 666, latitude: 55.6799209, longitude: 12.5800284 },
]

const yourMap = () => {
  return (
    <MapView data={data} />
  )
};
```

## License:
MIT