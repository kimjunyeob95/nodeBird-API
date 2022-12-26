const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        // 생성,수정날짜 컬럼 생성됨
        timestamps: true,
        // 표기법 수정 기본 카멜표기, 스네이크표기
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        // 삭제 시 deletedAt 필드에 업데이트
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  }
}

module.exports = Post;
