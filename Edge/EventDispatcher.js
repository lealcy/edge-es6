"use strict";

export class EventDispatcher {
    constructor() {
        this._dispatchers = new Set;
        this._events = new Map;
    }

    addDispatcher(dispatcher) {
        if (this._dispatchers.has(dispatcher) {
            this._dispatchers.add(dispatcher);
        }
    }

    deleteDispatcher(dispatcher, preserveReceivers = false) {
        if (this._dispatchers.has(dispatcher) {
            if (!preserveReceivers) {
                this._events.forEach((eventReceivers, eventName) => {
                    eventReceivers.forEach((callback, eventReceiverId) {
                        dispatcher.deleteFromEvent(eventName, eventReceiverId);
                    });
                });
            }
            this._dispatchers.delete(dispatcher);
        }
    }

    on(eventName, callback, eventReceiverId = Symbol()) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Map);
        }
        this._events.get(eventName).add(eventReceiverId, callback);
        this._iterateDispatchers(
            (dispatcher) => dispatcher.on(eventName, callback, eventReceiverId)
        );

        return eventReceiverId;
    }

    event(eventName, eventObj) {
        if (this._events.has(eventName)) {
            this._events.get(eventName).forEach(
                (eventReceiverId, callback) =>
                    callback(eventObj, eventReceiverId);
            );
        }
        this._iterateDispatchers(
            (dispatcher) => dispatcher.event(eventName, eventObj)
        );
    }

    clearEvent(eventName) {
        if (this._events.has(eventName)) {
            this._events.delete(eventName);
        }

        this._iterateDispatchers(
            (dispatcher) => dispatcher.clearEvent(eventName)
        );
    }

    deleteFromEvent(eventName, eventReceiverId) {
        if (this._events.has(eventName) &&
            this._events.get(eventName).has(eventId)) {
            this._events.delete(eventName);
        }

        this._iterateDispatchers(
            (dispatcher) =>
                dispatcher.deleteFromEvent(eventName, eventReceiverId)
        );
    }

    _iterateDispatchers(callback) {
        this._dispatchers.forEach((dispatcher) => callback(dispatcher));
    }
}
