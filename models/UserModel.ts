import db from "../database/db";
import { DataTypes } from "sequelize";


export const UserModel = db.define('user', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo email no puede estar vacío'
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo password no puede estar vacío'
            },

        }
    },
    roles: {
        type: DataTypes.JSON,  // Cambia el tipo a JSON para que soporte estructuras JSON
        defaultValue: ['user'],  // Valor por defecto, un array con 'user'
        allowNull: false,  // Opcional, para asegurar que no haya valores nulos
    },
}, {
    timestamps: false
});
(async () => {
    await db.sync({ alter: true });
    // console.log("All models were synchronized successfully.");
})();

export default UserModel