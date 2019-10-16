const Unsplash = require('unsplash-js').default;
global.fetch = require('node-fetch');

const unsplash = new Unsplash({
    applicationId: process.env.ACCESS_KEY,
    secret: process.env.SECRET_KEY,
});

module.exports = {
    getPhotosOfCity: async (cityName, page = 1, perPage = 30) => {
        let response;
        let responseJson = null;
        try {
            response = await unsplash.search.photos(cityName, page, perPage);
            if (response.ok) {
                responseJson = (await response.json()).results;
            }
        } catch (e) {
            console.error(e);
        }

        return responseJson;
    },
};
