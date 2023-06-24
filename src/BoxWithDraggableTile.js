import React, { useRef, useEffect } from 'react';
import { View, PanResponder, Animated, Dimensions } from 'react-native';

const BoxWithDraggableTile = () => {
  const pan1 = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const tileSize = 50;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Initialize the PanResponder for Tile 1
  const panResponder1 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan1.x, dy: pan1.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // You can add any additional logic here upon release
      }
    })
  ).current;

  // Initialize the PanResponder for Tile 2
  const panResponder2 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan2.x, dy: pan2.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        
      }
    })
  ).current;

  useEffect(() => {
    // Reset the positions of the tiles when the component mounts
    pan1.setValue({ x: 0, y: 0 });
    pan2.setValue({ x: 0, y: 0 });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: windowWidth * 0.8,
          height: windowHeight * 0.8,
          borderWidth: 14,
          borderColor: 'black',
        }}
      >
        <Animated.View
          style={{
            width: tileSize,
            height: tileSize,
            backgroundColor: 'red',
            transform: [
              { translateX: pan1.x },
              { translateY: pan1.y },
            ],
            position: 'absolute',
          }}
          {...panResponder1.panHandlers}
        />
        <Animated.View
          style={{
            width: tileSize,
            height: tileSize,
            backgroundColor: 'blue',
            transform: [
              { translateX: pan2.x },
              { translateY: pan2.y },
            ],
            position: 'absolute',
            top: windowWidth * 0.8 - tileSize,
            left: windowWidth * 0.8 - tileSize,
          }}
          {...panResponder2.panHandlers}
        />
      </View>
    </View>
  );
};

export default BoxWithDraggableTile;
