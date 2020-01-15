/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList
} from 'react-native';

import RNAndroidInstalledApps from 'react-native-android-installed-apps';
import InstalledApp from './models/installed-app';
import Card from './components/Card';

//const App: () => React$Node = () => {
class App extends Component {
    state = { allInstalledApps : [] };

    componentDidMount() {
        this.fetchInstalledApps();
    }

    fetchInstalledApps() {
        RNAndroidInstalledApps.getApps()
            .then(apps => {
                // If you want to see full object in console, then uncomment below line.
                //console.log(apps[0])
                const allApps = [];
                for ( const app in apps){
                    allApps.push(
                        new InstalledApp(app, apps[app].appName, apps[app].apkDir)
                    )
                }
                this.setState({
                    allInstalledApps : allApps
                });               
            });
    }

    render() {

        return(
            <FlatList 
                data={this.state.allInstalledApps}
                keyExtractor={itemData => itemData.id}
                renderItem={itemData => <Card appName={itemData.item.appName} apkDir={itemData.item.apkDir}/>}
            />
        );
    }
};

export default App;
