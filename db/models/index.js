'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is required everywhere

// This is also probably a good place for you to set up your associations

const Student = require('./student');

const Sequelize = require('sequelize');
const db = require('../index.js');

const images = [
    'https://pbs.twimg.com/profile_images/699984147956289536/CjPw79mo.jpg',
    'https://i.pinimg.com/originals/23/a8/22/23a8222cf7ab83bdd8ec0e1b8a7efe74.jpg',
    'http://cdn.smehost.net/ratmcom-uslegacystage/wp-content/uploads/2017/04/finsbury.jpg',
    'https://pbs.twimg.com/profile_images/3477665359/006b1390cb5faaa6b5bb8289222a5128.jpeg',
    'https://pbs.twimg.com/profile_images/598184475005210625/NokMkdIm_400x400.png',
    'http://www.rockandroll.fr/tree/mainitemgfxthumb/deep-purple-256-51.jpg',
    'https://pbs.twimg.com/profile_images/700015511455797250/SESqjJHo.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61MqRvjmFoL._CR0,0,500,500_UX128.jpg'
]

const randomImage = () => images[Math.floor(Math.random() * images.length)];

const returnImage = (images) => {
    return randomImage();
}

const Campus = db.define('campus', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  image: {
      type: Sequelize.STRING,
      defaultValue: function() {
          return returnImage(images);
      }
  }
});

Campus.hasMany(Student, {
    foreignKey: {allowNull: false},
    onDelete: 'cascade',
    hooks: true
});

Student.belongsTo(Campus);

module.exports = {
    Campus,
    Student
}
