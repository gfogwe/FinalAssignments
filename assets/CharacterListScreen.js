import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CharacterListScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        try {
            const storedCharacters = await AsyncStorage.getItem('characters');
            if (storedCharacters) {
                setCharacters(JSON.parse(storedCharacters));
            }
        } catch (error) {
            console.error('Error loading characters:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item.name} - {item.race} - {item.class}</Text>
            <Button
                title="View"
                onPress={() => navigation.navigate('CharacterView', { character: item })}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {characters.length > 0 ? (
                <FlatList
                    data={characters}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text>No characters found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
});

export default CharacterListScreen;
