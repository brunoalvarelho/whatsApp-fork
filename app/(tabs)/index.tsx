import { View, Text, StyleSheet } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.legal}>
        This is an example of a legal text.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  legal: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
});

export default Page;
