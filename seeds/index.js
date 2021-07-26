const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// const dbUrl =  process.env.DB_URL ;
// ||'mongodb://localhost:27017/yelp-camp'
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            //MY USER ID ; DO NOT DELETE TAMMY
            author: '60a955a7d962c40015c9ddc2',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Camping is a recreational (and oftentimes laid-back) activity pursued outdoors, away from cities and towns and in the lap of nature, with fresh air and (occasionally) wildlife for company. One can set up a tent, or live in a caravan, camper-van or motor-home when camping.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {

                    url: 'https://res.cloudinary.com/dosjbs42e/image/upload/v1621580290/YelpCamp/qmlutcrcp0uzubu4lvcq.jpg',
                    filename: 'YelpCamp/qmlutcrcp0uzubu4lvcq'
                },
                {

                    url: 'https://res.cloudinary.com/dosjbs42e/image/upload/v1621580292/YelpCamp/vi5ongqeycyqsxd7vrth.jpg',
                    filename: 'YelpCamp/vi5ongqeycyqsxd7vrth'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});