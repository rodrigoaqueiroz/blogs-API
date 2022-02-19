const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategory', {}, {
    timestamps: false,
  });
  
  postsCategory.associate = ({ BlogPosts, Category }) => {
    BlogPosts.belongsToMany(Category, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    Category.belongsToMany(BlogPosts, {
      as: 'posts',
      through: postsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return postsCategory;
};

module.exports = PostsCategory;
