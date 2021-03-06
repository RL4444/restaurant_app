import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import List from '../components/List';

import useResults from '../hooks/useResults';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, fetchResults, results, error, requesting] = useResults();

    const filterResultsByPrice = (price) =>
        results.filter((result) => result.price !== undefined && result.price.length === price);

    return (
        <View style={styles.container}>
            {requesting !== false ? (
                <View
                    style={{
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: '#ff4242',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 20 }}>Loading App</Text>
                </View>
            ) : (
                <>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        location={location}
                        fetchResults={fetchResults}
                    />
                    {error.length > 0 && <Text style={styles.error}>{error}</Text>}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <List data={filterResultsByPrice(2)} title={'Middle of the Road'} requesting={requesting} />
                        <List data={filterResultsByPrice(3)} title={'Top Tier'} requesting={requesting} />
                        <List data={filterResultsByPrice(1)} title={'Cost Effective'} requesting={requesting} />
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
    },
    foundSubHeadline: {
        marginTop: 6,
    },
    error: {
        color: 'red',
    },
});
