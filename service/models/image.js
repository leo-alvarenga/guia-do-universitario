const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    img: {
      type: Buffer
    }
});

ImageSchema.methods.toJSON = function () {
    const result = this.toObject();
    delete result.photo;
    return result;
};

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;