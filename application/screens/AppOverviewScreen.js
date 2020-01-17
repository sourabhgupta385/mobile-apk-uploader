import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const AppOverviewScreen = props => {
  const selectItemHandler = title => {
    props.navigation.navigate(title);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="View System Apps"
          onPress={() => {
            selectItemHandler('SystemApps');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="View Non System Apps"
          onPress={() => {
            selectItemHandler('NonSystemApps');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    width: 250,
  },
});

export default AppOverviewScreen;
