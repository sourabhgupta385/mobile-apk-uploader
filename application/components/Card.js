import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";
import Upload from 'react-native-background-upload';
import futch from './api';

const Card = props => {

  const sendServer = () => {
    console.log("Sending Started")
    const data = new FormData();
    data.append('name', 'testName');
    data.append('app', {
        uri: 'content://system/app/YouTube/YouTube.apk',
        type: 'application/vnd.android.package-archive',
        name: 'YouTube'
      });
    
    console.log(data)
    const url = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000'; // genymotion's localhost is 10.0.3.2
    futch(url + '/single', {
      method: 'post',
      body: data
    }, (e) => {
      const progress = e.loaded / e.total;
      console.log(progress);
      this.setState({
        progress: progress
      });
    }).then((res) => console.log(res), (e) => console.log(e))
  }

  return (
    <View style={styles.card}>
        <View style={styles.details}>
              <Text >App Name: <Text style={styles.name}>{props.appName}</Text></Text>
              <Text >APK Location: <Text style={styles.location}>{props.apkDir}</Text></Text>
              <Button title="Upload APK" onPress={sendServer} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 100,
    margin: 20
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
    color: '#C2185B'
  },
  location: {
    fontSize: 13,
    color: '#FFC107'
  },
  details: {
    height: "25%",
    padding: 10,
    alignItems: "center"
  }
});

export default Card;