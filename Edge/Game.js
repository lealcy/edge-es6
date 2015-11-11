"use strict";

import "EventDispatcher.js";

export class Game extends EventDispatcher {
    constructor(canvasElement) {
        super();
        const this._canvas = canvasElement;
        this._running = false;
        this.focusOnStart = true;
        const this.renderer = new Renderer(this.getContext(), GameEvents.START,
            GameEvents.STOP);

        this.addDispatcher(this.renderer);
    }

    start() {
        if (!this._running) {
            this._running = true;
            if (this.focusOnStart) {
                this._canvas.tabIndex = 1; // make "canvas" focusable.
                this._canvas.style.outline = "none"; // remove focus outline.
                this._canvas.focus();
            }
        }
        this.event(GameEvents.START, this);
    }

    stop() {
        this._running = false;
        this.event(GameEvents.STOP, this);
    }

    get running() { return this._running; }

    get drawingContext() { return this._canvas.getContext("2d"); }

    get canvas() { return canvas; }
}

export const GameEvents = {
    START: Symbol(),
    STOP: Symbol(),
}
