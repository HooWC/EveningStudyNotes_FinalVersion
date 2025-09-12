import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../src/slice/authSlice";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = () => {
    dispatch(registerUser({ fullName, email, password }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Registered successfully!");
        router.replace("/users"); // 注册成功后跳转
      })
      .catch((err) => {
        Alert.alert("Error", err.message || "Registration failed");
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}