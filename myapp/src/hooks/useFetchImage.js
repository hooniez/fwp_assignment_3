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
        accessKey: "xmCyeWVEbCaXc3MP7IgFrCSEctakn1KIlCTLhC8kvVU",
        secret: "y_e6oT2F0FR64ZYFZSSS2iGRWki-HPGYLytNQC1fZ2I",
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
            console.log(res);
            setValue(res.response.results[0].urls.thumb);
        }
        getPhotoSrc();
    }, []);

    return [value, setValue];
}