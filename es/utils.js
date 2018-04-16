'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serialize = serialize;
exports.deserialize = deserialize;
function serialize(val) {
    return JSON.stringify(val);
}

function deserialize(val) {
    if (typeof val !== 'string') {
        return undefined;
    }
    try {
        return JSON.parse(val);
    } catch (e) {
        return val || undefined;
    }
}