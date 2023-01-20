import { ActivityIndicator, View } from "react-native";

export function Loading(): JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#09090A"}}>
      <ActivityIndicator color="#7C3AED" size="large"/>
    </View>
  )
}