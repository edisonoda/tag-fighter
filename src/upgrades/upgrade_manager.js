import { EventManager } from "../events/event_manager.js";
import { Game } from "../game.js";

// Mediator of events and upgrades
export class UpgradeManager {
    static instance = null;
    static getInstance() {
        if (!UpgradeManager.instance)
            UpgradeManager.instance = new UpgradeManager();

        return UpgradeManager.instance;
    }

    constructor() {
        if (UpgradeManager.instance)
            return UpgradeManager.instance;

        UpgradeManager.instance = this;

        this.eventManager = EventManager.getInstance();
        this.eventManager.attach(this);
        this.player = Game.player;
        this.events = {};
    }

    addUpgrade(event, upgrade) {
        if (!this.events[event])
            this.events[event] = [];

        this.events[event].push(upgrade);
    }

    removeUpgrade(event, upgrade) {
        if (!this.events[event])
            return;

        this.events[event] = this.events[event].filter(c => c !== upgrade);
    }

    onEvent(event, data) {
        if (!this.events[event])
            return;
        
        for (const upgrade of this.events[event])
            upgrade(data);
    }
}