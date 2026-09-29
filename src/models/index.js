import User from "./Users.js";
import Events from "./Events.js";
import Notes from "./Notes.js"
import Tasks from "./Tasks.js";

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

User.hasMany(Tasks, {
    foreignKey: "id_user"
})

Tasks.belongsTo(User, {
    foreignKey: "id_user"
})

Events.hasMany(Tasks, {
    foreignKey: "id_event"
})

Tasks.belongsTo(Events, {
    foreignKey: "id_event"
})

export {
    User,
    Events,
    Notes,
    
}