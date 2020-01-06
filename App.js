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
  Text
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNAndroidInstalledApps from 'react-native-android-installed-apps';

//const App: () => React$Node = () => {
class App extends Component {
  /* Define state of app component */
    state = { firstAppName : "Loading" };
  
    componentDidMount() {
        /* When component first mounts/starts, run check() once */
        console.log("2")
        RNAndroidInstalledApps.getApps().then(apps => {
                console.log("4")
                if(apps.length > 0) {
                    console.log("5")
                    /* Get first item from apps array */
                    const firstApp = apps[0];

                    /* Set component state with first app name */
                    this.setState({ firstAppName : firstApp.appName });
                    console.log({ firstApp })
                }
                else {
                    console.log("6")
                    /* If no apps returned, display default message */
                    this.setState({ firstAppName : 'No app name found' });
                }                    
            });
        console.log("9")    
    }
  render() {
        return(
            <View>
                <Text>Hello</Text>
                {/* { this.state.firstAppName } */}
            </View>
        );
    }
};

export default App;
