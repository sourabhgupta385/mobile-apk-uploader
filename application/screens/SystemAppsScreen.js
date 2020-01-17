import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
  Text,
} from 'react-native';
import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import InstalledApp from '../models/installed-app';
import AppItem from '../components/AppItem';
import Colors from '../constants/Colors';

const SystemAppsScreen = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [allInstalledApps, setAllInstalledApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  fetchInstalledApps = async () => {
    await RNAndroidInstalledApps.getSystemApps().then(apps => {
      // If you want to see full object in console, then uncomment below line.
      //console.log(apps[0])
      const allApps = [];
      for (const app in apps) {
        //console.log(apps[app].apkDir);
        allApps.push(
          new InstalledApp(
            app,
            apps[app].appName,
            apps[app].apkDir,
            apps[app].size,
            apps[app].icon,
          ),
        );
      }
      // this.setState({
      //   allInstalledApps: allApps,
      // });
      setAllInstalledApps(allApps);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchInstalledApps();
  }, []);

  openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setIsUploading(true);

      const formData = new FormData();

      formData.append('name', 'avatar');

      formData.append('fileData', {
        uri: res.uri,
        type: res.type,
        name: res.name,
      });

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };

      fetch('http://10.0.2.2:3000/upload-avatar', config).then(response => {
        if (response.status === 200) {
          setIsUploading(false);
          ToastAndroid.show('APK uploaded successfully!!!', ToastAndroid.LONG);
        } else {
          setIsUploading(false);
          ToastAndroid.show(
            'There was some error in uploading APK!!!',
            ToastAndroid.LONG,
          );
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('Cancelled');
      } else {
        console.log('Error');
        throw err;
      }
    }
  };

  readFiles = async (appName, apkDir) => {
    const destPath = RNFS.ExternalStorageDirectoryPath + '/' + appName + '.apk';

    await RNFS.moveFile(apkDir, destPath)
      .then(success => {
        Alert.alert(
          'Select APK file',
          'Please select APK from root of the internal storage.',
          [
            {text: 'Okay', onPress: openFilePicker},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
        );
      })
      .catch(err => {
        console.log('Error: ' + err.message);
      });
  };

  if (isUploading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.uploadingText}>Uploading APK...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={allInstalledApps}
        keyExtractor={itemData => itemData.id}
        renderItem={itemData => (
          <AppItem
            appName={itemData.item.appName}
            apkDir={itemData.item.apkDir}
            size={itemData.item.size}
            icon={itemData.item.icon}>
            <Button
              title="Upload APK"
              color={Colors.primary}
              onPress={() => {
                readFiles(itemData.item.appName, itemData.item.apkDir);
              }}
            />
          </AppItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    fontSize: 15,
    marginVertical: 20,
    color: Colors.primary,
  },
});

export default SystemAppsScreen;
