const mongoose = require('mongoose');

const URL ='mongourl_to_connect';

const mongoClient = async () =>{
    await mongoose.connect(URL ,{useNewUrlParser : true},(err,result) =>{
        if (err) {
            console.log('----',err);
        }
        else{
        const foodItems = mongoose.connection.db.collection("foodItems");
        foodItems.find({}).toArray(async function(err , itemsData) {
                const foodCategories = await mongoose.connection.db.collection("foodCategories");
                foodCategories.find({}).toArray(function (err , categoriesData)  {
                        if (err) console.log(err);
                        else{
                            global.FOOD_ITEMS = itemsData;
                            global.FOOD_CATEGORIES = categoriesData;
                        }
                })
        });
        console.log('Conneted to database!');}
    });
}

module.exports = mongoClient;
