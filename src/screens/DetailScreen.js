import React, { useState, useEffect } from 'react';

import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { View, Image, Text, StyleSheet, FlatList, Linking } from 'react-native';
import ReviewsList from '../components/ReviewsList';
import yelp from '../api/yelp';

const DetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [detail, setDetail] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [requesting, setRequesting] = useState(true);
    const [reviewRequesting, setReviewRequesting] = useState(true);

    const fetchReviews = async (businessId) => {
        try {
            const res = await yelp.get(`/${businessId}/reviews`);
            setReviews([...res.data.reviews]);
        } catch (err) {
            console.error(err);
        } finally {
            setReviewRequesting(false);
        }
    };

    const fetchResults = async (businessId) => {
        try {
            const res = await yelp.get(`/${businessId}`);
            setDetail({ ...res.data });
        } catch (err) {
            console.error(err);
        } finally {
            setRequesting(false);
        }
    };

    useEffect(() => {
        fetchResults(id);
        fetchReviews(id);
    }, []);
    return (
        <>
            {!requesting && (
                <View style={styles.container}>
                    <View style={styles.headline}>
                        <Text style={styles.title}>{detail.name}</Text>
                        {detail.isOpen ? (
                            <Text style={styles.open}>Open</Text>
                        ) : (
                            <Text style={styles.closed}>Closed</Text>
                        )}
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.addressWrapper}>
                            <FlatList
                                data={detail.location.display_address}
                                keyExtractor={(line) => line}
                                renderItem={({ item }) => {
                                    return <Text style={styles.address}>{item}</Text>;
                                }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Entypo
                                onPress={() => {
                                    Linking.openURL(`tel:${detail.phone}`);
                                }}
                                name='phone'
                                size={40}
                                color='black'
                            />
                            <View style={{ marginLeft: 6 }}>
                                <Fontisto
                                    onPress={() => {
                                        Linking.openURL(detail.url);
                                    }}
                                    name='world-o'
                                    size={40}
                                    color='black'
                                />
                            </View>
                        </View>
                    </View>
                    <FlatList
                        style={styles.flatListWrapper}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={detail.photos}
                        keyExtractor={(photo) => photo}
                        renderItem={({ item }) => {
                            return <Image style={styles.image} source={{ uri: item }} />;
                        }}
                    />
                    {!reviewRequesting && reviews.length > 0 && (
                        <ReviewsList data={reviews} requesting={reviewRequesting} />
                    )}
                </View>
            )}
        </>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        width: 200,
    },
    headline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flatListWrapper: {
        marginTop: 10,
    },

    addressWrapper: {
        marginBottom: 5,
        marginTop: 9,
        color: 'black',
    },
    address: {
        fontSize: 16,
    },
    image: {
        marginRight: 10,
        width: 200,
    },
    open: {
        fontSize: 14,
        color: 'green',
    },
    closed: {
        fontSize: 14,
        color: 'red',
    },
});
