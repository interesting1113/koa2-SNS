const Sequelize = require('sequelize')
const seq = require('./seq')

// User, table name: users
const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: 'nickname'
  }
});

// Blog, table name: blog
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// foreign key
Blog.belongsTo(User, {
  // Blogs.userId -> User.id
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  // Blogs.userId -> User.id
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}