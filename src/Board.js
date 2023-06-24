import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import VerticalTile from './tiles/VerticalTile';
import MainTile from './tiles/MainTile';
import HorizontalTile from './tiles/HorizontalTile';
import SmallTile from './tiles/SmallTile';
import Swipe from 'react-native-swipe-gestures';

const Board = ({ board, onTilePress, onTileSwipe }) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        // Calculate the direction based on the movement of dx and dy
        let direction;
        if (Math.abs(dx) > Math.abs(dy)) {
          direction = dx > 0 ? 'right' : 'left';
        } else {
          direction = dy > 0 ? 'down' : 'up';
        }

        // Call the onTileSwipe function with the appropriate parameters
        const { locationX, locationY } = event.nativeEvent;
        const target = document.elementFromPoint(locationX, locationY);
        const rowIndex = parseInt(target.getAttribute('data-rowIndex'), 10);
        const colIndex = parseInt(target.getAttribute('data-colIndex'), 10);
        onTileSwipe(board[rowIndex][colIndex], direction, rowIndex, colIndex);
      },
    })
  ).current;

  return (
    <View style={styles.board}>
      <View style={styles.gridContainer}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((tile, colIndex) => (
              <Swipe
                key={colIndex}
                style={styles.tileContainer}
                onSwipeLeft={() =>
                  onTileSwipe(
                    tile,
                    'left',
                    tile.pRow === undefined ? rowIndex : tile.pRow,
                    tile.pCol === undefined ? colIndex : tile.pCol
                  )
                }
                onSwipeRight={() =>
                  onTileSwipe(
                    tile,
                    'right',
                    tile.pRow === undefined ? rowIndex : tile.pRow,
                    tile.pCol === undefined ? colIndex : tile.pCol
                  )
                }
                onSwipeUp={() =>
                  onTileSwipe(
                    tile,
                    'up',
                    tile.pRow === undefined ? rowIndex : tile.pRow,
                    tile.pCol === undefined ? colIndex : tile.pCol
                  )
                }
                onSwipeDown={() =>
                  onTileSwipe(
                    tile,
                    'down',
                    tile.pRow === undefined ? rowIndex : tile.pRow,
                    tile.pCol === undefined ? colIndex : tile.pCol
                  )
                }
              >
                <TouchableOpacity
                  activeOpacity={1} // Disable click animation
                  style={styles.tileContent}
                  onPress={() => onTilePress(rowIndex, colIndex)}
                  {...panResponder.panHandlers}
                >
                  {tile.type !== 'empty' && getTile(tile, rowIndex, colIndex)}
                </TouchableOpacity>
              </Swipe>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const getTile = (tile, rowIndex, colIndex) => {
  switch (tile.type) {
    case 'vertical':
      return <VerticalTile rowIndex={rowIndex} colIndex={colIndex} />;
    case 'horizontal':
      return <HorizontalTile rowIndex={rowIndex} colIndex={colIndex} />;
    case 'main':
      return <MainTile rowIndex={rowIndex} colIndex={colIndex} />;
    case 'small':
      return <SmallTile rowIndex={rowIndex} colIndex={colIndex} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  board: {
    padding: 10,
    borderColor: '#43423C',
    borderWidth: 14,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  tileContainerN: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tileContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 111,
    height: 90,
    width: 90,
  },
  tileContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Board;
