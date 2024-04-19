import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

type SwipeableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

export default class SwipeableRow extends Component<SwipeableRowProps> {
  private renderRightActions = (progress: Animated.AnimatedInterpolation<number> ) => {
    const trans = progress.interpolate({ inputRange: [0, 1],outputRange: [100, 0]});

    return(
      <View
      style={{
        width: 100,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>

      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: '#dd2c00' }]}
          onPress={this.close}>
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </Animated.View>
    </View>
    )
  }

  private swipeableRow?: Swipeable;
  private updateRef = (ref: Swipeable) => { this.swipeableRow = ref;};
  private close = () => {
    this.swipeableRow?.close();
    this.props.onDelete()
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={50}
        renderRightActions={this.renderRightActions}
        // onSwipeableOpen={(direction) => {
        //   console.log(`Opening swipeable from the ${direction}`);
        // }}
        // onSwipeableClose={(direction) => {
        //   console.log(`Closing swipeable to the ${direction}`);
        // }}
        >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});