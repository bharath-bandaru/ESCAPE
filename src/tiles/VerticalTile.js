import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const VerticalTile = (props) => {
  const handlePress = () => {
    console.log('Vertical pressed!');
  };

  return (
     <View onPress={handlePress}>
        <View style={styles.box1}>
          <View style={styles.circle} />
        </View>
    </View>
  );
};

export default VerticalTile;

const styles = StyleSheet.create({
  box1: {
    width: 80,
    height: 170,
    margin: 5,
    zIndex:9,
    backgroundColor: '#403B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderColor: '#A1944F',
    borderWidth: 2,
  },
});
