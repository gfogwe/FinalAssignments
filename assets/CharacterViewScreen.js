// CharacterViewScreen.js
import React from 'react';
import { View, Text } from 'react-native';

function CharacterViewScreen({ route }) {
    const { character } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name: {character.name}</Text>
            <Text>Race: {character.race}</Text>
            <Text>Class: {character.class}</Text>
            <Text>Stats: {JSON.stringify(character)}</Text>
        </View>
    );
}

export default CharacterViewScreen;
