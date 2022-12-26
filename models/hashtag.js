const Sequelize = require("sequelize");

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        title: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        // 생성,수정날짜 컬럼 생성됨
        timestamps: true,
        // 표기법 수정 기본 카멜표기, 스네이크표기
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        // 삭제 시 deletedAt 필드에 업데이트
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  }
}
module.exports = Hashtag;
