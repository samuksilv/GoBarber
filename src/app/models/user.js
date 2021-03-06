import Sequelize, { Model, useInflection } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            provider: Sequelize.BOOLEAN,
        },
            {
                sequelize
            });

        this.addHook('beforeSave', async (user) =>
            await encryptPassword(user)
        );
        
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    };

}

async function encryptPassword(user) {
    if (user.password)
        user.password_hash = await bcrypt.hash(user.password, 8);
    return this;
}

export default User;

