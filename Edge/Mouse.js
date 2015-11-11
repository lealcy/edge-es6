"use strict";

export class Mouse {
    constructor(HTMLElement, startEvent, stopEvent) {
        this.ignoreInput = false;
        this.noMoveEventOnDrag = false;
        this._element = HTMLElement;
        this._initialEvent = false;

        this.on(startEvent, this.enable);
        this.on(stopEvent, this.disable);
    }

    enable() {
        this._element.onmousedown = this._onMouseDown;
        this._element.onmouseup = this._onMouseUp;
        this._element.onmousemove = this._onMouseMove;
        this._element.onmousewheel = this._onMouseWheel;
        this._element.onmouseout = this._onMouseOut;
        this._element.oncontextmenu = this._onContextMenu;
    }

    disable() {
        this._element.onmousedown = function() {};
        this._element.onmouseup = function() {};
        this._element.onmousemove = function() {};
        this._element.onmousewheel = function() {};
        this._element.onmouseout = function() {};
        this._element.oncontextmenu = function() {};
    }

    _processEvent(e) {
        return {
             button: e.button,
             x: e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX,
             y: e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY,
             wheelDirection: e.wheelDelta / 120,
             DOMMouseEvent: e,
        };
    }

    _onMouseWheel(e) {
        if (!this.ignoreInput) {
            e = this._processEvent(e);
            this.event(MouseEvents.WHEEL, e);
            if (e.wheelDirection == MouseButtons.WHEEL_UP) {
                this.event(MouseEvents.WHEEL_UP, e);
            } else if (e.wheelDirection == MouseButtons.WHEEL_DOWN) {
                this.event(MouseEvents.WHEEL_DOWN, e);
            }
            return false;
        }
    }
}

export const MouseEvents = {
    WHEEL: Symbol(),
    WHEEL_UP: Symbol(),
    WHEEL_DOWN: Symbol(),
    DOWN: Symbol(),
    UP: Symbol(),
    CLICK: Symbol(),
    LEFT_CLICK: Symbol(),
    RIGHT_CLICK: Symbol(),
    CENTER_CLICK: Symbol(),
    OUT: Symbol(),
    BEGIN_DRAG: Symbol(),
    END_DRAG: Symbol(),
    MOVE: Symbol(),
    CONTEXT_MENU: Symbol(),
};

export const MouseButtons = {
    NONE: -1,
    LEFT: 0,
    CENTER: 1,
    RIGHT: 2,
    WHEEL_UP: 1,
    WHEEL_DOWN: -1,
    WHEEL_NONE: 0,
};
