const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);

// 모델 불러오기
const User = require('./User')(sequelize, Sequelize); 
const Comment = require('./Comment')(sequelize, Sequelize); 
const Card = require('./Card')(sequelize, Sequelize); 
const CardLike = require('./CardLike')(sequelize, Sequelize); 
const CommentLike = require('./CommentLike')(sequelize, Sequelize); // 여기 수정

// 모델간 관계 연결 // 유저 1 : 댓글 N
User.hasMany(Comment, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE',
  foreignKey: 'userid',
  sourceKey: 'id'
});
Comment.belongsTo(User, {
  foreignKey: 'userid',
  targetKey: 'id'
});

// 유저 1 : 카드좋아요 N
User.hasMany(CardLike, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE', 
  foreignKey: 'user_id' 
});
CardLike.belongsTo(User, { 
  foreignKey: 'user_id' 
});

// 카드 1 : 카드좋아요 N
Card.hasMany(CardLike, { 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE',
  foreignKey: 'card_id' 
});
CardLike.belongsTo(Card, { 
  foreignKey: 'card_id' 
});

// 유저 1 : 댓글좋아요 N
User.hasMany(CommentLike, {
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE', 
  foreignKey: 'user_id' 
});
CommentLike.belongsTo(User, { 
  foreignKey: 'user_id' 
});

// 카드 1 : 댓글좋아요 N
Card.hasMany(CommentLike, { 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE',
  foreignKey: 'card_id' 
});
CardLike.belongsTo(Card, { 
  foreignKey: 'card_id' 
});

// 카드 1 : 댓글 N = 카드별 댓글 작성을 위해서 ! 
Card.hasMany(Comment, { 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'card_id'
});
Comment.belongsTo(Card, {
  foreignKey: 'card_id'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Card = Card;
db.CardLike = CardLike;
db.CommentLike = CommentLike; // 여기 수정

module.exports = db;
