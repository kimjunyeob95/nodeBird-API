const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(20),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        // 생성,수정날짜 컬럼 생성됨
        timestamps: true,
        // 표기법 수정 기본 카멜표기, 스네이크표기
        underscored: false,
        modelName: "User",
        tableName: "users",
        // 삭제 시 deletedAt 필드에 업데이트
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      as: "Followers",
      foreignKey: "followingId",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      as: "Followings",
      foreignKey: "followerId",
      through: "Follow",
    });
    db.User.hasMany(db.Domain);
  }
}

module.exports = User;
