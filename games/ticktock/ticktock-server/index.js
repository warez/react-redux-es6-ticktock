var actions = require("./actions.js");
var Store = require("./store.js");
var Core = require("./core.js");

module.exports = {
    actions: actions,
    makeStore: Store.makeStore,
    getType: Core.getType
};