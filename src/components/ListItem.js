import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { withNavigation } from 'react-navigation';

const ListItem = ({ businessId, title, source, rating, reviewCount, navigation }) => {
    const pressHandler = (id) => {
        navigation.navigate('Detail', { id });
    };

    return (
        <TouchableOpacity onPress={() => pressHandler(businessId)}>
            <View style={styles.listItemContainer}>
                <Image style={styles.imageStyle} source={{ uri: source }} />
                <Text style={styles.restaurantTitle}>{title}</Text>
                <View style={styles.ratingsContainer}>
                    <Text style={styles.ratingText}>Rating {rating}</Text>
                    <Text style={styles.ratingText}>{reviewCount} Reviews</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default withNavigation(ListItem);

const styles = StyleSheet.create({
    listItemContainer: {
        display: 'flex',
        width: 230,
        height: 180,
        // justifyContent: 'space-around',
    },
    imageStyle: {
        width: 215,
        height: 130,
        borderRadius: 4,
    },
    restaurantTitle: {
        marginTop: 14,
        fontWeight: '700',
    },
    ratingsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 2,
    },
    ratingText: {
        marginRight: 8,
        color: '#7a7a7a',
        fontSize: 12,
    },
});
