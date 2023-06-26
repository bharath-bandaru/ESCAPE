import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import VerticalTile from './tiles/VerticalTile';
import MainTile from './tiles/MainTile';
import HorizontalTile from './tiles/HorizontalTile';
import SmallTile from './tiles/SmallTile';
import Swipe from 'react-native-swipe-gestures';

const Board = ({ board, onTilePress, onTileSwipe, mainTileSize, setMainTileSize }) => {
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

  let { width } = Dimensions.get('window');
  let tileWidth = (width*90) / 412;
  if (width > 408) {
    width = 408;
    tileWidth = 90;
  }
  useEffect(() => {
      setMainTileSize(tileWidth*2-10);
    }, []);
  return (
    <View style={[styles.board]}>
      <View style={styles.gridContainer}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((tile, colIndex) => (
              <Swipe
                key={colIndex}
                style={[styles.tileContainer, { width: tileWidth, height: tileWidth }]}
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
                  {tile.type !== 'empty' && getTile(tile, rowIndex, colIndex, tileWidth, width)}
                </TouchableOpacity>
              </Swipe>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const getTile = (tile, rowIndex, colIndex, tileWidth, width) => {
  switch (tile.type) {
    case 'vertical':
      return <VerticalTile rowIndex={rowIndex} colIndex={colIndex} tileWidth = {tileWidth} width={width}/>;
    case 'horizontal':
      return <HorizontalTile rowIndex={rowIndex} colIndex={colIndex} tileWidth = {tileWidth} width={width}/>;
    case 'main':
      return <MainTile rowIndex={rowIndex} colIndex={colIndex} tileWidth = {tileWidth} width={width}/>;
    case 'small':
      return <SmallTile rowIndex={rowIndex} colIndex={colIndex} tileWidth = {tileWidth} width={width}/>;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  board: {
    padding: 10,
    borderColor: '#252521',
    borderWidth: 14,
    maxWidth: 408,
    marginTop:3,
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
    // height: 90,
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
