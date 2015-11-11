"use strict";

export class Renderer extends EventDispatcher {
    constructor(drawingContext, startEvent, stopEvent) {
        super();
        const this._context = drawingContext;
        const this._startEvent = startEvent;
        const this._stopEvent = stopEvent;
        const this._running = false;
        const this.renderInterval = 1000 / 60;
        const this.manualRendering = false;
        const this.clearBeforeRefresh = true;
        const this._requestAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, this.renderInterval);
            };

        this.on(startEvent, () => {
            this._running = true;
            if (!this.manualRendering) {
                this.render();
            }
        });

        this.on(stopEvent, () => { this._running = false; });
    }

    render() {
        if(!this.manualRendering) {
            this._requestAnimationFrame(this.render);
        }
        if (this._running) {
            if (this._clearBeforeRefresh) {
                this._context.clearRect(
                    0, 0, this._context.canvas.width,
                    this._context.canvas.height
                );
            }
            this.event(RenderEvents.RENDER, this);
        }
    }
}

export const RendererEvents = {
    RENDER: Symbol(),
};
