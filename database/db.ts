import { Sequelize } from "sequelize";
import { DB_HOST, DB_PORT, DB_DEV_NAME, DB_TEST_NAME, DB_PASSWORD, DB_USER, NODE_ENV } from "../utils/config";
const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
	port: DB_PORT,  // '8889' for mac, '3306' for windows
	define: {
		timestamps: false,
	}
})

export default db;