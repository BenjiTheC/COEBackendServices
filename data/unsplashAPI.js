const Unsplash = require('unsplash-js').default;
global.fetch = require('node-fetch');

const unsplash = new Unsplash({
    applicationId: process.env.ACCESS_KEY,
    secret: process.env.SECRET_KEY,
});

const secondUnsplash = new Unsplash({
    applicationId: process.env.SECOND_ACCESS_KEY,
    secret: process.env.SECOND_SECRET_KEY,
});

module.exports = {
    getPhotosOfCity: async (cityName, usedAPI = 1, page = 1, perPage = 30) => {
        const useUnsplash = usedAPI === 1 ? unsplash : secondUnsplash;
        let response;
        let responseJson = null;
        try {
            response = await useUnsplash.search.photos(cityName, page, perPage);
            if (response.ok) {
                responseJson = (await response.json()).results;
            } else {
                console.log(response.status);
                console.log(response.headers);
            }
        } catch (e) {
            console.error(e);
        }

        return responseJson;
    },
};
