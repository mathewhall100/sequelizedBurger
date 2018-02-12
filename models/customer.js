module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      // Customer has a name 
      customer_name: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
  
    Customer.associate = function(models) {
      // Associating Customer with Burgers
      // When an Customer is deleted, also delete any associated Posts
      Customer.hasMany(models.Burger, {
        onDelete: "cascade"
      });
    };

    return Customer;
  };