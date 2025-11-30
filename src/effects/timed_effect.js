import { Effect } from './effect.js';
import * as Constants from '../utils/constants.js';

export class TimedEffect extends Effect {
    constructor({
        target,
        intensity = Constants.FX_INTENSITY,
        duration = Constants.FX_DURATION
    }) {
        super({ target, intensity });
        this.duration = duration;
        this.elapsed = 0;
    }
    
    apply(dt) { super.apply(); }
    activate() { this.active = true; }

    update(dt) {
        if (!this.active) return;

        this.elapsed += dt;
        if (this.elapsed >= this.duration) {
            this.elapsed = 0;
            this.activate = false;
        }

        this.apply(dt);
    }
}