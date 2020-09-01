import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

const SearchScreen = ({ searchTerm, setSearchTerm, fetchResults }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <Feather name='search' size={24} color='black' />
                <TextInput
                    onEndEditing={() => fetchResults(searchTerm)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={searchTerm}
                    placeholder={'Search'}
                    style={styles.inputStyle}
                    onChangeText={(searchTermValue) => setSearchTerm(searchTermValue)}
                />
                {searchTerm.length > 0 && (
                    <MaterialIcons
                        style={styles.cancel}
                        onPress={() => setSearchTerm('')}
                        name='clear'
                        size={24}
                        color='black'
                    />
                )}
            </View>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchWrapper: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
        borderRadius: 8,
        marginBottom: 4,
    },
    inputStyle: {
        paddingLeft: 16,
        fontSize: 20,
        lineHeight: 24,
        flex: 1,
    },
    cancel: {
        width: 45,
        marginLeft: 'auto',
    },
});
