import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Colors from '../constants/Colors';
import Card from './Card';

const AppItem = props => {
  const base64String = 'data:image/png;base64,' + props.icon;
  const apkSize = props.size / (1024 * 1024);

  return (
    <Card style={styles.card}>
      <View style={styles.details}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: base64String}} />
        </View>
        <View style={styles.textContainer}>
          <Text>
            <Text style={styles.name}>{props.appName}</Text>
          </Text>
          <Text>
            <Text style={styles.size}>{apkSize.toFixed(2)}MB</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>{props.children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 130,
    margin: 20,
  },
  details: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    marginVertical: 5,
    color: Colors.primary,
  },
  size: {
    fontSize: 13,
    color: Colors.accent,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AppItem;
