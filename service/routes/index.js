const router = require('express').Router();

router.use('/posts/', require('./routes/post.routes'));
router.use('/user/', require('./routes/user.routes'));

module.exports = router;