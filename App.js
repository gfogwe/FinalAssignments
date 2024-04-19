
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterCreationScreen from './assets/CharacterCreationScreen';
import CharacterListScreen from './assets/CharacterListScreen';
import CharacterViewScreen from './assets/CharacterViewScreen';
import { initDb } from './assets/DBService'; // Import the initDb function

const Stack = createStackNavigator();

function App() {
    // Initialize the database schema when the app starts
    useEffect(() => {
        initDb();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CharacterCreation" component={CharacterCreationScreen} />
                <Stack.Screen name="CharacterList" component={CharacterListScreen} />
                <Stack.Screen name="CharacterView" component={CharacterViewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
