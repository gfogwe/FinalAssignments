import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const humanImage = require('./human.png');
const elfImage = require('./elf.jpg');
const dwarfImage = require('./dwarf.jpg');

function CharacterCreationScreen({ navigation }) {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [cls, setClass] = useState('');
    const [stats, setStats] = useState([8, 8, 8, 8, 8, 8]); // Initial stats
    const [pointsPool, setPointsPool] = useState(30); // Total points available for distribution
    const [soundObject, setSoundObject] = useState(null); // Initialize soundObject state
    const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];//stats to change 


    useEffect(() => {
        // Load background music when the component mounts
        const loadBackgroundMusic = async () => {
            try {
                const newSoundObject = new Audio.Sound();
                await newSoundObject.loadAsync(require('./assassin.mp3'));
                await newSoundObject.playAsync();
                setSoundObject(newSoundObject);
            } catch (error) {
                console.error('Error loading background music:', error);
            }
        };

        loadBackgroundMusic();

        // Cleanup function to stop the background music when the component unmounts
        return () => {
            if (soundObject) {
                soundObject.stopAsync();
            }
        };
    }, []);

    const increaseStat = (index) => {
        if (pointsPool > 0 && stats[index] < 18) {
            const updatedStats = [...stats];
            updatedStats[index]++;
            setStats(updatedStats);
            setPointsPool(pointsPool - 1); // Decrement pointsPool when a stat increases
        }
    };

    const decreaseStat = (index) => {
        if (stats[index] > 8) {
            const updatedStats = [...stats];
            updatedStats[index]--;
            setStats(updatedStats);
            setPointsPool(pointsPool + 1); // Increment pointsPool when a stat decreases
        }
    };

    const handleSave = async () => {
        const character = { name, race, cls }; // Remove stats from the character data since it's not needed in the list screen
        try {
            let storedCharacters = await AsyncStorage.getItem('characters');
            if (!storedCharacters) {
                storedCharacters = [];
            } else {
                storedCharacters = JSON.parse(storedCharacters);
            }
            storedCharacters.push(character);
            await AsyncStorage.setItem('characters', JSON.stringify(storedCharacters));
            console.log('Character saved successfully:', character);
            navigation.navigate('CharacterList');
        } catch (error) {
            console.error('Error saving character:', error);
        }
    };


    return (
        <ImageBackground source={require('./background1.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    placeholderTextColor="white"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Select Race:</Text>
                <View style={styles.imageContainer}>
                    <Image source={humanImage} style={[styles.image, race === 'Human' && styles.selectedImage]} />
                    <Image source={elfImage} style={[styles.image, race === 'Elf' && styles.selectedImage]} />
                    <Image source={dwarfImage} style={[styles.image, race === 'Dwarf' && styles.selectedImage]} />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.bubbleButton}>
                        <Button title="Human" onPress={() => setRace("Human")} color={race === 'Human' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Elf" onPress={() => setRace("Elf")} color={race === 'Elf' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Dwarf" onPress={() => setRace("Dwarf")} color={race === 'Dwarf' ? 'green' : 'lightblue'} />
                    </View>
                </View>

                <Text style={styles.label}>Select Class:</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.bubbleButton}>
                        <Button title="Wizard" onPress={() => setClass("Wizard")} color={cls === 'Wizard' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Fighter" onPress={() => setClass("Fighter")} color={cls === 'Fighter' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Archer" onPress={() => setClass("Archer")} color={cls === 'Archer' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Thief" onPress={() => setClass("Thief")} color={cls === 'Thief' ? 'green' : 'lightblue'} />
                    </View>
                    <View style={styles.bubbleButton}>
                        <Button title="Necromancer" onPress={() => setClass("Necromancer")} color={cls === 'Necromancer' ? 'green' : 'lightblue'} />
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.label}>Stats:</Text>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statRow}>
                            <Text style={{ marginRight: 10, color: 'white' }}>{statNames[index]}:</Text>
                            <Text>{stat}</Text>
                            <Button title="+" onPress={() => increaseStat(index)} disabled={pointsPool === 0 || stat === 18} color="blue" />
                            <Button title="-" onPress={() => decreaseStat(index)} disabled={stat === 8} color="blue" />
                        </View>
                    ))}
                </View>

                <Text style={styles.pointsText}>Points Remaining: {pointsPool}</Text>
                <Button title="Save Character" onPress={handleSave} style={styles.saveButton} />
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white', // Change the color to your desired color
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color:'white',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
    },
    selectedImage: {
        backgroundColor: 'green', // Background color when selected
        borderRadius: 25, // Half of the image size to make it circular
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statsContainer: {
        marginBottom: 20,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 2,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    pointsText: {
        fontSize: 16,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
    },
    saveButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    bubbleButton: {
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 5,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }
});

export default CharacterCreationScreen;
