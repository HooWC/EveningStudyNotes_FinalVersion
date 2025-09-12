import { useEffect, useState } from "react";
import api from "../src/api/axios";
import { View, Text, FlatList } from "react-native";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.UserID.toString()}
        renderItem={({ item }) => (
          <Text>{item.FullName} - {item.Email}</Text>
        )}
      />
    </View>
  );
}