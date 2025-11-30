import * as Constants from '../utils/constants.js';

export class Effect {
    constructor({ target, intensity = Constants.FX_INTENSITY }) {
        this.target = target;
        this.intensity = intensity;

        this.active = false;
    }

    apply() {
        console.error(`Undefined abstract method in class:`, Effect.name);
    }
    
    activate() {
        this.active = true;
        this.apply();
    }

    update(dt) { }
}