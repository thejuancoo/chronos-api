import User from "./Users.js";
import Events from "./Events.js";
import Notes from "./Notes.js"

User.hasMany(Events, {
    foreignKey: "id_user"
})

Events.belongsTo(User, {
    foreignKey: "id_user"
})

User.hasMany(Notes, {
    foreignKey: "id_user"
})

Notes.belongsTo(User, {
    foreignKey: "id_user"
})

Events.hasMany(Notes, {
    foreignKey: "id_event"
})

Notes.belongsTo(Events, {
    foreignKey: "id_event"
})

export {
    User,
    Events
}