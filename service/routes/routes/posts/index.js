const { databaseClient } = require('../../../db/database');
const { statusCode, DB_NAME, USER_COLLECTION_NAME } = require('../../util');
const ObjectId = require('mongodb').ObjectId;

const excludePostFromFavorites = async (post_id) => {
    try {
        const users = await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).find({}).toArray();

        users.forEach(async (user) => {
            if (user.favorites) {
                if (user.favorites.includes(post_id)) {
                    const filtered = user.favorites.filter((fav) => fav !== post_id && fav !== null && fav !== undefined);

                    try {
                        await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).updateOne({ _id: ObjectId(user._id) }, { favorites: filtered });
                    } catch (err) {
                        // ...
                    }
                }
            }
        });
    } catch (error) {
        return statusCode.BAD_REQUEST;
    }
};

module.exports = excludePostFromFavorites;