import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export type BoxedIconProps = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
}

const BoxedIcon: React.FC<BoxedIconProps> = React.memo(
  ({ name, backgroundColor }) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 6}}>
      <Ionicons name={name} size={22} color="white" />
    </View>
  );
});

export default BoxedIcon;
