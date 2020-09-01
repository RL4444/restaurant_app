import React, { useState } from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';

const List = ({ title, data, requesting }) => {
    return (
        <>
            {data.length > 0 ? (
                <View style={styles.container}>
                    <Text style={styles.titleText}>{title}</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(result) => result.id}
                        data={data}
                        style={styles.listContainer}
                        renderItem={({ item }) => {
                            return (
                                <ListItem
                                    businessId={item.id}
                                    title={item.name}
                                    source={item.image_url}
                                    rating={item.rating}
                                    reviewCount={item.review_count}
                                />
                            );
                        }}
                    />
                </View>
            ) : null}
        </>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        paddingTop: 9,
        paddingBottom: 5,
        borderBottomColor: '#c7c7c7',
        height: 240,
    },
    listContainer: {
        marginTop: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '800',
    },
});
