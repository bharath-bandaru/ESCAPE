import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const VerticalTile = (props) => {
  const handlePress = () => {
    console.log('Vertical pressed!');
    props.onTilePress(props.rowIndex,props.colIndex)
  };

  const slideUpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log(props.swipe)
    if (props.swipe === 'up') {
      Animated.timing(slideUpAnim, {
        toValue: -props.tileWidth,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [props.swipe]);

  return (
    <Animated.View style={{ transform: [{ translateY: slideUpAnim }] }}>
      <TouchableOpacity activeOpacity={1} onPress={handlePress}>
        <View style={[styles.box1, { width: props.tileWidth - 10, height: props.tileWidth * 2 - 10 }]}>
          <View style={styles.circle} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VerticalTile;

const styles = StyleSheet.create({
  box1: {
    margin: 5,
    zIndex: 9,
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

