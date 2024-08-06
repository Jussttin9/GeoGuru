const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const OpenTripMapAPI = process.env.OPENTRIPMAP_API_KEY;

async function getLocationData(city, country = '') {
    try {
        const apiKey = OpenTripMapAPI;
        const coordinatesUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&country=${country}&apikey=${apiKey}`;

        const coordinateResponse = await axios.get(coordinatesUrl);

        if (coordinateResponse.status !== 200) {
            throw new Error('Failed to fetch coordinates. Server responded with status: ' + coordinateResponse.status);
        }

        return coordinateResponse.data;
    } catch (error) {
        throw new Error('Error fetching coordinates: ' + error.message);
    }
}

async function getAttractions(city, country, radius) {
    try {
        const apiKey = OpenTripMapAPI;

        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        const apiUrl = `http://api.opentripmap.com/0.1/en/places/radius?lon=${longitude}&lat=${latitude}&radius=${radius}&limit=10&format=json&apikey=${apiKey}`;

        const attractionsResponse = await axios.get(apiUrl);

        if (attractionsResponse.status !== 200) {
            throw new Error('Failed to fetch attractions. Server responded with status: ' + attractionsResponse.status);
        }

        const imgMap = {};
        
        const filteredData = attractionsResponse.data.filter(item => item.name && item.xid !== '');
        const xids = attractionsResponse.data.filter(item => item.xid !== '');
        for (const item of xids) {
            const url = `http://api.opentripmap.com/0.1/en/places/xid/${item.xid}?apikey=${apiKey}`;
            const imgUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=File:People_on_the_beach_in_La_Jolla&prop=imageinfo&iiprop=url&format=json';
            try {
                const responseOne = await axios.get(url);
                const placeObj = responseOne.data;
                const imgWeb = placeObj.image;

                const responseTwo = await axios.get(imgUrl);
                const data = responseTwo.data;
            
                const pages = data.query.pages;
                const pageId = Object.keys(pages)[0]; // Get the first page ID
                const imageInfo = pages[pageId].imageinfo[0]; // Assuming there's at least one imageinfo object
                const imageUrl = imageInfo.url;
                imgMap[item.xid] = imageUrl;
            } catch (error) {
                console.error(`Error fetching data for XID: ${item.xid}`, error);
            }
        }

        const attractions = filteredData.map(item => ({
            name: item.name,
            image: (imgMap[item.xid] || 'None'),
            xid: item.xid
        }));

        return attractions;
    } catch (error) {
        throw new Error('Error fetching attractions: ' + error.message);
    }
}

// const city = 'LaJolla';
// const country = 'us';
// const radius = 10000; // Specify the radius in meters
// const filters = ['restaurants', 'amusement parks', 'zoos']; // Specify filters if needed

// getAttractions(city, country, radius, filters)
//     .then(attractions => {
//         console.log('Attractions:', attractions);
//     })
//     .catch(error => {
//         console.error('Error fetching attractions:', error.message);
//     });

module.exports = {getLocationData, getAttractions};