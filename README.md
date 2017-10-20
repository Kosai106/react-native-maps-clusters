# React-Native-Maps-Clusters

_A simple solution for providing clustering to [React-Native-Maps](https://github.com/airbnb/react-native-maps) for both Android and iOS_

[![Build Status](https://travis-ci.org/Kosai106/react-native-maps-clusters.svg?branch=master)](https://travis-ci.org/Kosai106/react-native-maps-clusters)
[![npm version](https://badge.fury.io/js/react-native-maps-clusters.svg)](https://badge.fury.io/js/react-native-maps-clusters)

__Example gif:__

![alt text](https://raw.githubusercontent.com/Kosai106/react-native-maps-clusters/master/example.gif "Clusters example")

## Installation:
```bash
npm install react-native-maps-clusters --save
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

Todo
----

- Allow for custom marker and cluster icons
- Write tests

License
--------

     Copyright (c) 2017 Kevin Østerkilde

     Licensed under the The MIT License (MIT) (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

        https://raw.githubusercontent.com/Kosai106/react-native-maps-clusters/master/LICENSE