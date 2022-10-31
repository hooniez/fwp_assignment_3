import {useEffect, useState} from "react";
import {createApi} from 'unsplash-js';

export default function useFetchImage(initialValue) {
    const [value, setValue] = useState(initialValue);
    const unsplash = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
    })


    useEffect(() => {
        console.log(value);
        const getPhotoSrc = async () => {
            let res = await unsplash.search.getPhotos({
                query: value,
                page: 1,
                perPage: 1,
            });
            setValue(res.response.results[0].urls.thumb);
        }
        getPhotoSrc();
    }, []);

    return [value, setValue];
}