"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceInit = exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var path = require("path");
var user_entity_1 = require("./entity/user.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: path.resolve(__dirname, "users.db"),
    entities: [user_entity_1.User],
    logging: false,
    synchronize: true,
});
var dataSourceInit = function () {
    exports.myDataSource
        .initialize()
        .then(function () {
        console.log("Data Source has been initialized!");
    })
        .catch(function (err) {
        console.error("Error during Data Source initialization:", err);
    });
};
exports.dataSourceInit = dataSourceInit;
