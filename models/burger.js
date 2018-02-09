// define sequelize object 'burger'

module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
            burger_name: {

                type: DataTypes.STRING,
                allowNull: false,

            },

            devoured: {

                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },

        {
            timestamps: false
        });

        Burger.associate = function(models) {
            // if eaten each Burger may have a customer
            // foreign key may be null as a burger may not have a customer if not yet eaten!
            Burger.belongsTo(models.Customer, {
              foreignKey: {
                allowNull: true,
              }
            });
          };

    return Burger;

};