const actions = require("./actions.js");
const Store = require("./store.js");
const Core = require("./core.js");

module.exports = {
    actions: actions,
    makeStore: Store.makeStore,
    getType: Core.getType
};