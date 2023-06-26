import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Board from './src/Board';
import EscapeImage from './assets/ESCAPE.svg'
import AvatarImage from './assets/avatar.png'
export default function App() {
  const [board, setBoard] = useState([
    [{ type: 'vertical' }, { type: 'main' }, { type: 'm',  pRow: 0, pCol: 1 }, { type: 'vertical' }],
    [{ type: 'v', pRow: 0, pCol: 0 }, { type: 'm',  pRow: 0, pCol: 1  }, { type: 'm',  pRow: 0, pCol: 1 }, { type: 'v', pRow: 0, pCol: 3 }],
    [{ type: 'empty' }, { type: 'horizontal' }, { type: 'h',  pRow: 2, pCol: 1 }, { type: 'empty' }],
    [{ type: 'vertical' }, { type: 'small'}, { type: 'small'}, { type: 'vertical' }],
    [{ type: 'v', pRow: 0, pCol: 0 }, {type: 'small' }, { type: 'small' }, { type: 'v', pRow: 0, pCol: 0 }]
  ]);

  const updateVerticalTileOnSwipe = (direction, rowIndex, colIndex) => {
    // This method takes care of vertical tile
    switch (direction) {
      case "left":
        if (colIndex === 0 || board[rowIndex][colIndex - 1]['type'] !== "empty" || board[rowIndex+1][colIndex - 1]['type'] !== "empty") {
          return;
        } else {
          // move the tile left in board and just update the board
          const updatedBoard = [...board];
          // Move the tile left
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex-1] = {type: 'vertical'};
          updatedBoard[rowIndex+1][colIndex-1] = {type: 'v', pRow: rowIndex, pCol: colIndex-1};;
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "right":
        if (colIndex === 3 || board[rowIndex][colIndex + 1]['type'] !== "empty" || board[rowIndex+1][colIndex + 1]['type'] !== "empty") {
          return;
        } else {
          // move the tile right in board and just update the board
          const updatedBoard = [...board];
          // Move the tile right
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'vertical'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'v', pRow: rowIndex, pCol: colIndex+1};;
          // Update the state with the new board
          setBoard(updatedBoard);
        } 
        break;
      case "up":
        if (rowIndex == 0 || board[rowIndex-1][colIndex]['type'] != 'empty' ){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex-1][colIndex] = {type: 'vertical'};
          updatedBoard[rowIndex][colIndex] = {type: 'v', pRow: rowIndex-1, pCol: colIndex};
          updatedBoard[rowIndex+1][colIndex] = {type: 'empty'};
          setBoard(updatedBoard);
        }
        break;
      case "down":
        if (rowIndex == 3 || board[rowIndex+2][colIndex]['type'] != 'empty' ){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'vertical'};
          updatedBoard[rowIndex+2][colIndex] = {type: 'v', pRow: rowIndex+1, pCol: colIndex};
          setBoard(updatedBoard);
        }
        break;
      default:
        break;
    }
  }

  const updateHorizontalTileOnSwipe = (direction, rowIndex, colIndex) => {
    // this method takes care of horixontal tile
    switch (direction) {
      case "left":
        if (colIndex === 0 || board[rowIndex][colIndex - 1]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile left in board and just update the board
          const updatedBoard = [...board];
          // Move the tile left
          updatedBoard[rowIndex][colIndex] = {type: 'h', pRow: rowIndex, pCol: colIndex-1};
          updatedBoard[rowIndex][colIndex-1] = {type: 'horizontal'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'empty'};;
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "right":
        if (colIndex === 2 || board[rowIndex][colIndex + 2]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile right in board and just update the board
          const updatedBoard = [...board];
          // Move the tile right
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'horizontal'};
          updatedBoard[rowIndex][colIndex+2] = {type: 'h', pRow: rowIndex, pCol: colIndex+1};;
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "up":
        if (rowIndex == 0 || board[rowIndex-1][colIndex]['type'] != 'empty' || board[rowIndex-1][colIndex+1]['type'] != 'empty'){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex-1][colIndex] = {type: 'horizontal'};
          updatedBoard[rowIndex-1][colIndex+1] = {type: 'h', pRow: rowIndex-1, pCol: colIndex};
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'empty'};
          setBoard(updatedBoard);
        }
        break;
      case "down":
        if (rowIndex == 4 || board[rowIndex+1][colIndex]['type'] != 'empty' || board[rowIndex+1][colIndex+1]['type'] != 'empty'){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'horizontal'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'h', pRow: rowIndex+1, pCol: colIndex};
          setBoard(updatedBoard);
        }
        break;
      default:
        break;
    }
  }

  const updateSmallTileOnSwipe = (direction, rowIndex, colIndex) => {
    // This method takes care of small tile
    switch (direction) {
      case "left":
        if (colIndex === 0 || board[rowIndex][colIndex - 1]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile left in board and just update the board
          const updatedBoard = [...board];
          // Move the tile left
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex-1] = {type: 'small'};
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "right":
        if (colIndex === 3 || board[rowIndex][colIndex + 1]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile right in board and just update the board
          const updatedBoard = [...board];
          // Move the tile right
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'small'};
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "up":
        if (rowIndex == 0 || board[rowIndex-1][colIndex]['type'] != 'empty'){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex-1][colIndex] = {type: 'small'};
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          setBoard(updatedBoard);
        }
        break;
      case "down":
        if (rowIndex == 4 || board[rowIndex+1][colIndex]['type'] != 'empty'){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'small'};
          setBoard(updatedBoard);
        }
        break;
      default:
        break;
      }
  }

  const updateMainTileOnSwipe = (direction, rowIndex, colIndex) => {
    // This method takes care of main tile and main tile occupies right tile, bottom tile and bottom right tile
    switch (direction) {
      case "left":
        if (colIndex === 0 || board[rowIndex][colIndex - 1]['type'] !== "empty" || board[rowIndex+1][colIndex - 1]['type'] !== "empty" || board[rowIndex][colIndex - 1]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile left in board and just update the board
          const updatedBoard = [...board];
          // Move the tile left
          updatedBoard[rowIndex][colIndex] = {type: 'm', pRow: rowIndex, pCol: colIndex-1};
          updatedBoard[rowIndex][colIndex-1] = {type: 'main'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'm', pRow: rowIndex, pCol: colIndex-1};
          updatedBoard[rowIndex+1][colIndex-1] = {type: 'm', pRow: rowIndex, pCol: colIndex-1};
          updatedBoard[rowIndex][colIndex+1] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'empty'};
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "right":
        if (colIndex === 2 || board[rowIndex][colIndex + 2]['type'] !== "empty" || board[rowIndex+1][colIndex + 2]['type'] !== "empty" || board[rowIndex][colIndex + 2]['type'] !== "empty") {
          return;
        }
        else {
          // move the tile right in board and just update the board
          const updatedBoard = [...board];
          // Move the tile right
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'main'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'm', pRow: rowIndex, pCol: colIndex+1};
          updatedBoard[rowIndex][colIndex+2] = {type: 'm', pRow: rowIndex, pCol: colIndex+1};
          updatedBoard[rowIndex+1][colIndex+2] = {type: 'm', pRow: rowIndex, pCol: colIndex+1};
          // Update the state with the new board
          setBoard(updatedBoard);
        }
        break;
      case "up":
        if (rowIndex == 0 || board[rowIndex-1][colIndex]['type'] != 'empty' || board[rowIndex-1][colIndex+1]['type'] != 'empty'){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex-1][colIndex] = {type: 'main'};
          updatedBoard[rowIndex-1][colIndex+1] = {type: 'm', pRow: rowIndex-1, pCol: colIndex};
          updatedBoard[rowIndex][colIndex] = {type: 'm', pRow: rowIndex-1, pCol: colIndex};
          updatedBoard[rowIndex][colIndex+1] = {type: 'm', pRow: rowIndex-1, pCol: colIndex};
          updatedBoard[rowIndex+1][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'empty'};
          setBoard(updatedBoard);
        }
        break;
      case "down":
        if (rowIndex == 3 || board[rowIndex+2][colIndex]['type'] != 'empty' || board[rowIndex+2][colIndex+1]['type'] != 'empty' ){
          return;
        }else{
          const updatedBoard = [...board];
          updatedBoard[rowIndex][colIndex] = {type: 'empty'};
          updatedBoard[rowIndex][colIndex+1] = {type: 'empty'};
          updatedBoard[rowIndex+1][colIndex] = {type: 'main'};
          updatedBoard[rowIndex+1][colIndex+1] = {type: 'm', pRow: rowIndex+1, pCol: colIndex};
          updatedBoard[rowIndex+2][colIndex] = {type: 'm', pRow: rowIndex+1, pCol: colIndex};
          updatedBoard[rowIndex+2][colIndex+1] = {type: 'm', pRow: rowIndex+1, pCol: colIndex};
          setBoard(updatedBoard);
        }
        break;
      default:
        break;
    }
  }

  
  const onTileSwipe = (tile, direction, rowIndex, colIndex) => {
    // Handle swipe direction for the tile at rowIndex and colIndex
    console.log(`Tile at (${rowIndex}, ${colIndex}) swiped ${direction}`);
    // console.log(board)
    switch (tile.type) {
      case "vertical":
        updateVerticalTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "v":
        updateVerticalTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "horizontal":
        updateHorizontalTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "h":
        updateHorizontalTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "main":
        updateMainTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "m":
        updateMainTileOnSwipe(direction, rowIndex, colIndex);
        break;
      case "small":
        updateSmallTileOnSwipe(direction, rowIndex, colIndex);
        break;
      default:
        break;
    }
    // if we click verticle tile, 
  };

  const handleTilePress = (rowIndex, colIndex, isPress) => {
    // Logic for handling tile press goes here...
    console.log(rowIndex," ",colIndex," ",isPress, " ",board)
    // 
  };
  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <Text style={{color:"#A1944F"}} >400</Text>
      </View>
      <StatusBar hidden />
      <View style={{flex:0, justifyContent:"center", alignItems:"center", paddingBottom:50}}>
        <Text style={{ 
          // fontFamily: 'Lato-Bold', 
          fontSize: 35,
          fontWeight: '700', 
          color: '#4F7752', letterSpacing: 18.225 }}>ESCAPE</Text>
        <Text style={{ 
          // fontFamily: 'Lato-Bold', 
          fontSize: 12, 
          color: '#7A7A7A'}}>
          Designed and Developed by <Image source={require('./assets/avatar.png')} style={{width: 18, height:18, opacity: 0.8, top:3}}/> Bharath Bandaru</Text>
      </View>
      <View style={styles.boardContainer}>
        <View style={styles.movesContainer}>
          <Text style={styles.defaultText}>Moves: 0</Text>
        </View> 
        <View style={styles.moreContainer}>
          <Text style={styles.defaultText}>More</Text>
        </View>
        <Board  board = {board} onTilePress={handleTilePress} onTileSwipe={onTileSwipe} />
        <Text style={styles.defaultText}> Bring the green block out!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRight: {
    position: 'absolute',
    top: 0,
    color:"#A1944F",
    right: 0,
    paddingRight: 20,
    paddingTop: 15,
    zIndex: 9999,
  },
  container: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movesContainer: {
    position: 'absolute',
    top: -20,
    left: 0,
    zIndex: 1,
  },
  moreContainer: {
    position: 'absolute',
    top: -20,
    right: 0,
    zIndex: 1,
  },
  defaultText: {
    color: '#A1944F',
  },
});
