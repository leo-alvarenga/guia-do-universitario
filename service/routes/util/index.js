const statusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,  
};

const DB_NAME = 'GuiaDoUniversitario';
const USER_COLLECTION_NAME = 'users';
const POST_COLLECTION_NAME = 'posts';
const TAG_COLLECTION_NAME = 'tags';

module.exports = {
    statusCode,
    DB_NAME,
    USER_COLLECTION_NAME,
    POST_COLLECTION_NAME,
    TAG_COLLECTION_NAME
};