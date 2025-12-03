export class EventManager {
    static instance = null;
    static getInstance() {
        if (!EventManager.instance)
            EventManager.instance = new EventManager();

        return EventManager.instance;
    }

    constructor() {
        if (EventManager.instance)
            return EventManager.instance;

        EventManager.instance = this;
        this.observers = [];
    }

    attach(obs) {
        this.observers.push(obs);
    }

    detach(obs) {
        this.observers = this.observers.filter(o => o !== obs);
    }

    notify(event, data = {}) {
        for (const obs of this.observers)
            obs.onEvent(event, data);
    }
}
