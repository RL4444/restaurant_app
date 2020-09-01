import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [currentLocation, setCurrentLocation] = useState('nyc');
    const [results, setResults] = useState([]);
    const [requesting, setRequesting] = useState(false);
    const [error, setError] = useState('');


    const fetchResults = async (term) => {
        setRequesting(true);
        setResults([]);
        setError('');
        try {
            const { data } = await yelp.get(`/search?limit=50&location=${currentLocation}&term=${term}`);
            setResults([...data.businesses]);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again later');
        } finally {
            setRequesting(false);
        }
    };

    useEffect(() => {
        fetchResults('italian');
    }, []);

    return [fetchResults, results, error, requesting];
};
