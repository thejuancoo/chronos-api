import User from "./Users.js";
import Events from "./Events.js";

User.hasMany(Events, {
    foreignKey: "user_id"
})

Events.belongsTo(User, {
    foreignKey: "user_id"
})

export {
    User,
    Events
}