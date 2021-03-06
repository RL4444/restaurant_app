import React from 'react';

import { View, FlatList, Linking, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const ReviewsList = ({ data }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Reviews</Text>
            <FlatList
                style={styles.listStyle}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(review) => review.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => Linking.openURL(String(item.url))}>
                            <View style={styles.reviewWrapper}>
                                <Image
                                    style={styles.reviewImage}
                                    source={{
                                        uri: item.user.image_url ? item.user.image_url : 'https://yelp.com',
                                    }}
                                />
                                <View style={styles.reviewContentWrapper}>
                                    <Text style={styles.reviewText}>{item.text}</Text>
                                    <Text style={styles.reviewOwner}>{item.user.name}</Text>
                                </View>
                                <Text style={styles.reviewScore}>{item.rating}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default ReviewsList;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        flex: 1,
    },
    listStyle: {
        display: 'flex',
        height: 'auto',
        marginTop: 6,
        alignSelf: 'stretch',
    },
    reviewWrapper: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    reviewImage: {
        marginTop: 4,
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    reviewContentWrapper: {
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'space-around',
    },
    reviewText: {
        color: 'black',
        fontSize: 12,
        paddingRight: 60,
    },
    reviewOwner: {
        color: 'grey',
        fontSize: 12,
        fontWeight: '600',
    },
    reviewScore: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 'auto',
        color: 'grey',
        marginTop: 12,
    },
});
