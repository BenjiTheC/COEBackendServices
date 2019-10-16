const { Router } = require('express');
const { unsplashAPI } = require('../data');
const { randomInteger } = require('./util');

const router = Router();

const DESC_PLACEHOLDER = 'Time is simply how you live your life.';
const NAME_PLACEHOLDER = 'Unkown';

const extractPhotoData = photo => {
    return {
        id: photo.id,
        description: photo.description || DESC_PLACEHOLDER,
        url: photo.urls.regular,
        likes: photo.likes,
        author: photo.user.name || NAME_PLACEHOLDER,
        tags: photo.tags.map(tag => tag.title),
    };
};

router.get('/barcelona', async (req, res) => {
    const randomPages = Array.from(Array(4).keys()).map(() => randomInteger(1, 41));

    let photosOfBarcelona = [];
    for (const page of randomPages) {
        const photosByPage = await unsplashAPI.getPhotosOfCity('barcelona', page);
        photosOfBarcelona = [...photosOfBarcelona, ...photosByPage];
    }

    return res.json(photosOfBarcelona.map(photo => extractPhotoData(photo)));
});

router.get('/florence', async (req, res) => {
    const randomPages = Array.from(Array(4).keys()).map(() => randomInteger(1, 13));
    let photosOfFlorence = [];
    for (const page of randomPages) {
        const photosByPage = await unsplashAPI.getPhotosOfCity('florence', page);
        photosOfFlorence = [...photosOfFlorence, ...photosByPage];
    }

    return res.json(photosOfFlorence.map(photo => extractPhotoData(photo)));
});

router.get('/prague', async (req, res) => {
    const randomPages = Array.from(Array(4).keys()).map(() => randomInteger(1, 25));
    let photosOfPrague = [];
    for (const page of randomPages) {
        const photosByPage = await unsplashAPI.getPhotosOfCity('prague', page);
        photosOfPrague = [...photosOfPrague, ...photosByPage];
    }

    return res.json(photosOfPrague.map(photo => extractPhotoData(photo)));
});

module.exports = router;
