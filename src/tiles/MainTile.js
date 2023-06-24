import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

const MainTile = (props) => {
  const handlePress = () => {
    console.log('Main pressed!');
  };

  return (
     <View onPress={handlePress}>
      <View style={styles.box2}>
        <View style={styles.circle} />
      </View>
    </View>
  );
};

export default MainTile;

const styles = StyleSheet.create({
  box2: {
    width: 170,
    height: 170,
    zIndex:999,
    margin:5,
    backgroundColor: '#4F7752',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderColor: '#273128',
    backgroundColor:'#273128',
    color:'#273128',
    borderWidth: 2,
  },
});
