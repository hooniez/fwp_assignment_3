import {useEffect, useState} from "react";
import {createApi} from 'unsplash-js';

/**
 * @module useFetchImage
 */

/**
 * A custom hook used to make an api call to fetch an image related to the name of the recipe
 * @param {string} queryKeyword - the keyword to search to fetch an image
 * @param {object} unsplash - an object with which to make an api call
 * @property {string} value - the url fetched from Unsplash
 * @returns {JSX.Element} the JSX code to render to the DOM tree
 * @constructor
 */

export default function useFetchImage(queryKeyword) {
    const [value, setValue] = useState(queryKeyword);
    const unsplash = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
    })

    // Fetch an image url
    useEffect(() => {
        const getPhotoSrc = async () => {
            let res = await unsplash.search.getPhotos({
                query: value,
                page: 1,
                perPage: 1,
            });
            // Set value to the url
            setValue(res.response.results[0].urls.thumb);
        }
        getPhotoSrc();
    }, []);

    return [value, setValue];
}