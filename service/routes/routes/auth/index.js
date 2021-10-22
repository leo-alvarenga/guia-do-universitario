const { databaseClient } = require('../../../db/database');
const { statusCode, DB_NAME, USER_COLLECTION_NAME } = require('../../util');

const authUser = async (username) => {
    try {
        const result = await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).findOne({ username });

        if (result === undefined || result === null) {
            return statusCode.NOT_FOUND;
        } else {
            if (result.role === 'admin')
                return statusCode.OK;
            else
                return statusCode.UNAUTHORIZED;
        }
    } catch (error) {
        return statusCode.BAD_REQUEST;
    }
};

module.exports = authUser;