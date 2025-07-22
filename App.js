import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from "./utils/supabase";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data, error } = await supabase.from('todos').select();

        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (data && data.length > 0) {
          setTodos(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err.message);
      }
    }

    fetchTodos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginBottom: 5 }}>{item.title}</Text>
        )}
      />
    </View>
  );
}
