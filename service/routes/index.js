const router = require('express').Router();

router.use('/posts/', require('./routes/post.routes'));
router.use('/user/', require('./routes/user.routes'));
router.use('/tags/', require('./routes/tag.routes').tagRouter);

module.exports = router;