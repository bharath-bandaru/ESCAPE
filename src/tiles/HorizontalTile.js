import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

const HorizontalTile = (props) => {
  console.log("hori",{width: props.tileWidth-10,height: props.tileWidth-10})
  console.log("board width",props.width)
  const handlePress = () => {
    console.log('Hori pressed!');
  };
  return (
    <View onPress={handlePress}>
      <View style={[styles.box3, {width: props.tileWidth*2-10,height: props.tileWidth-10}]}>
        <View style={styles.circle} />
      </View>
    </View>
  );
};

export default HorizontalTile;

const styles = StyleSheet.create({
  box3: {
    // width: 170,
    // height: 80,
    zIndex:9,
    margin:5,
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
