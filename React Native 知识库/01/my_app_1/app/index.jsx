import { Link } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>🏠 Home</Text>
      <Link href="/login" asChild>
        <Button title="Login" />
      </Link>
      <Link href="/register" asChild>
        <Button title="Register" />
      </Link>
      <Link href="/users" asChild>
        <Button title="Users" />
      </Link>
    </View>
  );
}