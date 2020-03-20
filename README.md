# React-Native-Maps-Clusters [![npm version](https://badge.fury.io/js/react-native-maps-clusters.svg)](https://badge.fury.io/js/react-native-maps-clusters)

📌 _A simple solution for providing clustering to [React-Native-Maps](https://github.com/airbnb/react-native-maps) for both Android and iOS_

## Installation:
```bash
yarn react-native-maps-clusters
```

## Usage:

```jsx
import MapView from 'react-native-maps-clusters';

const App = () => (
  <MapView
    data={[
      { currency: "€", price: 123, latitude: 55.6732765, longitude: 12.5670903 },
      { currency: "$", price: 69, latitude: 55.6839255, longitude: 12.5576476 },
      { currency: "£", price: 666, latitude: 55.6799209, longitude: 12.5800284 }
    ]}
  />
);
```