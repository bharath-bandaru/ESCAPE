import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const SmallTile = (props) => {
  // console.log("small",{width: props.tileWidth,height: props.tileWidth})
  // console.log("board width",props.width)
  const handlePress = () => {
    console.log('Small pressed!');
  };

  return (
     <View onPress={handlePress}>
      <View style={[styles.box4, {width: props.tileWidth-10,height: props.tileWidth-10}]}>
        <View style={styles.circle} />
      </View>
    </View>
  );
};

export default SmallTile;

const styles = StyleSheet.create({
  box4: {
    // width: 80,
    // height: 80,
    margin:5,
    zIndex:9,
    backgroundColor: '#766C46',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderColor: '#273128',
    borderWidth: 2,
  },
});
