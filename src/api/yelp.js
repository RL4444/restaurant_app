import axios from 'axios';
import secrets from '../../secrets.json';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: secrets.YELP_KEY,
    },
});

export const test = axios.create({
    baseURL: 'https://google.com',
});
