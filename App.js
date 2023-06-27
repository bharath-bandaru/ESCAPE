import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import Board from './src/Board';
import EscapeImage from './assets/ESCAPE.svg'
import AvatarImage from './assets/avatar.png'
export default function App() {
  const [board, setBoard] = useState([
    [{ type: 'vertical' }, { type: 'main' }, { type: 'm',  pRow: 0, pCol: 1 }, { type: 'vertical' }],
    [{ type: 'v', pRow: 0, pCol: 0 }, { type: 'm',  pRow: 0, pCol: 1  }, { type: 'm',  pRow: 0, pCol: 1 }, { type: 'v', pRow: 0, pCol: 3 }],
    [{ type: 'empty' }, { type: 'horizontal' }, { type: 'h',  pRow: 2, pCol: 1 }, { type: 'empty' }],
    [{ type: 'vertical' }, { type: 'small'}, { type: 'small'}, { type: 'vertical' }],
    [{ type: 'v', pRow: 3, pCol: 0 }, {type: 'small' }, { type: 'small' }, { type: 'v', pRow: 3, pCol: 3 }]
  ]);
  const [numberOfMoves, setNumberOfMoves] = useState(0)
  const updateVerticalTileOnSwipe = (direction, rowIndex, colIndex) => {
    // This method takes care of vertical tile
    switch (direction) {
      case "left":
        if (colIndex === 0 || board[rowIndex][colIndex - 1]['type'] !== "empty" || board[rowIndex+1][colIndex - 1]['type'] !== "empty") {
          return;
        } else {
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
          setNumberOfMoves(numberOfMoves+1)
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
    // console.log(`Tile at (${rowIndex}, ${colIndex}) swiped ${direction}`);
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
  
  const [mainTileSize, setMainTileSize] = useState(0);

  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const handleTilePress = (rowIndex, colIndex, isPress) => {
    // Logic for handling tile press goes here...
    console.log(rowIndex," ",colIndex," ",isPress, " ",board)
    // 
  };

  useEffect(() => {
    animateDownArrow();
  }, []);

  const animateDownArrow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnimation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
      { iterations: 3 }
    ).start();
  };

  const interpolatedValue = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust the output range to control the slide distance
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <Image source={require('./assets/likes.png')} style={{width:20, height:20, marginRight:2}}/>
        <Text style={{color:"#4F7752"}} >3000</Text>
      </View>
      <View style={styles.bottomRight}>
        <Image source={require('./assets/loves.png')} style={{width:20, height:20, marginRight:5, marginBottom: 12}}/>
      </View>
      <StatusBar hidden />
      <View style={{justifyContent:"center", alignItems:"center", marginBottom:30}}>
        <Text style={{ 
          // fontFamily: 'Lato-Bold', 
          fontSize: 35, alignItems:"center", justifyContent:"center",
          fontWeight: '700', marginLeft: 20,
          color: '#4F7752', letterSpacing: 18.225 }}>ESCAPE</Text>
          <View style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
            <Text style={{ 
              // fontFamily: 'Lato-Bold', 
              fontSize: 12, justifyContent:"center", alignItems:"center", display:"flex",
              color: '#7A7A7A'}}>
              Designed and Developed by Bharath Bandaru</Text>
              {/* <Image source={require('./assets/avatar2.png')} style={{width: 18, height:23.02, opacity: 0.5}}/>  */}
          </View>
      </View>
      <View style={styles.boardContainer}>
        <View style={styles.movesContainer}>
          <Image source={require('./assets/moves.png')} style={{width:20, height:20, marginRight:2, marginLeft:5, alignSelf: 'center'}}/>
          <Text style={[styles.defaultText,{alignSelf: 'center'}]}>{numberOfMoves}</Text>
        </View> 
        <View style={styles.moreContainer}>
          <Image source={require('./assets/more.png')} style={{width:20, height:20, marginRight:5, marginBottom: 5}}/>
        </View>
        <Board board = {board} onTilePress={handleTilePress} onTileSwipe={onTileSwipe} mainTileSize={mainTileSize} setMainTileSize={setMainTileSize}/>
        <View style={{width: mainTileSize, height: 14, backgroundColor: '#4F7752', marginTop: -14}}></View>
        {/* <Image source={require('./assets/down.png')} style={{width:30, height:30, marginTop:2, marginBottom: 4}}/> */}
        <View style={{ position: 'absolute', bottom: -47, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Animated.Image
            source={require('./assets/down.png')}
            style={{
              opacity: fadeAnimation,
              transform: [{ translateY: interpolatedValue }],
              width: 30,
              height: 30,
            }}
          />
        </View>
      </View>
      <Text style={[styles.defaultText, {paddingTop:5}]}> Bring the GREEN block out!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRight: {
    position: 'absolute',
    top: 0,
    color:"#A1944F",
    flex:1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    paddingRight: 10,
    paddingTop: 15,
    zIndex: 9999,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    color:"#A1944F",
    flex:1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    paddingRight: 10,
    paddingTop: 15,
    zIndex: 9999,
  },
  container: {
    flex: 1,
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movesContainer: {
    position: 'absolute',
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
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
