import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

import * as Location from 'expo-location';

export default () => {
    const [results, setResults] = useState([]);
    const [requesting, setRequesting] = useState(false);
    const [error, setError] = useState('');

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    const fetchResults = async (term) => {
        setRequesting(true);
        setResults([]);
        setError('');
        try {
            const { data } = await yelp.get(
                `/search?limit=50&latitude=${location.latitude}&longitude=${location.longitude}&term=${term}`
            );
            setResults([...data.businesses]);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again later');
        } finally {
            setRequesting(false);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied. You must enable location while using the app');
            }
            let locationFound = await Location.getCurrentPositionAsync({});
            setLocation({ ...locationFound.coords });
            fetchResults('italian');
        })();
    }, []);

    return [fetchResults, results, error, requesting];
};
