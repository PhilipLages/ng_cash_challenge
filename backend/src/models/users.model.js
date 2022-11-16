const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    return User;
};

module.exports = UserModel;
