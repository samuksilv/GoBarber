import Sequelize from "sequelize";
import configDatabase from "../config/database";
import User from '../app/models/user';

const models = [User];

class Database {
    constructor() {
        this.connection = new Sequelize(configDatabase);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();