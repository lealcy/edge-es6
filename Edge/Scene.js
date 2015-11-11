"use strict";

import "EventDispatcher.js";

export class Scene extends EventDispatcher {
    constructor(name) {
        this._name = name;
    }

    get name() { return this._name; }
}
