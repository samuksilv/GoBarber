module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "dev",
    database: "gobarber",
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
};