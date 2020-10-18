import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';

import mapMarker from '../images/map-marker.png';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  nome: string;
};

export default function OrphanagesMap() {
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, 
  []);

  function navigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }

  function navigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  return (
      <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.0000000,
          longitude: -49.0000000,
          latitudeDelta: 0.020,
          longitudeDelta: 0.020,
        }} 
      >
        { orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => navigateToOrphanageDetails(orphanage.id) } >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                      {orphanage.nome}
                  </Text>
                </View>
              </Callout>
          </Marker>
          )
        }) }

      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>
            {orphanages.length} Orfanatos encontrados
          </Text>

          <RectButton style={styles.createOrphanageButton} onPress={navigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#FFF" />
          </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});