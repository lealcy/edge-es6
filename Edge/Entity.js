"use strict";

import "EventDispatcher.js";

export class Entity extends EventDispatcher {
    constructor(name, type, class = EntityClasses.GENERIC) {
        super();
        this._name = name;
        this.type = type;
    }

    get name() { return this._name; }
}

export EntityClasses = {
    GENERIC: Symbol();
};
