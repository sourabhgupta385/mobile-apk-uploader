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
import DocumentPicker from 'react-native-document-picker';

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
                    if(apps[app].appName === 'testProject'){
                        console.log(apps[app])
                    }
                    allApps.push(
                        new InstalledApp(app, apps[app].appName, apps[app].apkDir)
                    )
                }
                this.setState({
                    allInstalledApps : allApps
                });               
            });
    }

    //Editing Starts Here
    openFilePicker = async () => {
        console.log("1")
        
        try {
            // const res = await DocumentPicker.pick({
            //     type: [DocumentPicker.types.allFiles],
            // });
            // console.log(res)
            // console.log("URI: "+res.uri)
            // console.log("Type: "+res.type)
            // console.log("Name: "+res.name)
            // console.log("Size: "+res.size)

            // fetch('http://10.0.2.2:3000/single', { // Your POST endpoint
            //     method: 'POST',
            //     // headers: {
            //     //     // Content-Type may need to be completely **omitted**
            //     //     // or you may need something
            //     //     "Content-Type": "You will perhaps need to define a content-type here"
            //     // },
            //     body: res // This is your file object
            // }).then(
            //     response => response.json() // if the response is a JSON object
            // ).then(
            //     success => console.log(success) // Handle the success response object
            // ).catch(
            //     error => console.log(error) // Handle the error response object
            // );

            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(res)
            const formData = new FormData();
            formData.append('name', 'avatar')
            formData.append('fileData', {
                uri : res.uri,
                type: res.type,
                name: res.name
            });
            // formData.append('fileData', {
            //     uri : '/data/app/com.testproject-H5Z02wUpZuJC0v0eC_dD3g==/base.apk',
            //     type: 'application/vnd.android.package-archive',
            //     name: 'testProject'
            // });
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            };
            console.log(config);
            fetch("http://10.0.2.2:3000/upload-avatar", config).then(
                (response) => { 
                    console.log(response); 
                    //console.log(response.json().message); 
                    //response.json(); 
                });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
            console.log("Cancelled")
            } else {
                console.log("Error")
                throw err;
            }
        }    
    }

    render() {

        return(
            <View>
                <Button title="Upload" onPress={this.openFilePicker} />
                <FlatList 
                    data={this.state.allInstalledApps}
                    keyExtractor={itemData => itemData.id}
                    renderItem={itemData => <Card appName={itemData.item.appName} apkDir={itemData.item.apkDir}/>}
                />    
            </View>
        );
    }
};

export default App;
