// TODO: create an abstract class to use as a base for an array of effects inside the Entity class

/**
 * Fluctuates the Entity opacity to create a blinking effect.
 * 
 * @param {number} intensity Value from 0-1, represents the least opaque state of the element
 * @param {number} speed How many blinks/s
 * @param {number} duration Duration of blink in seconds
 * @param {number} dt Delta time in seconds
 * 
 * @tutorial All effects should be assigned to an Entity object/class using the Object.assign(object, mixin) or Object.assign(Class.prototype, mixin) methods.
 */
const blinking = {
    _intensity, _duration,
    
    blink(intensity, speed, duration, dt) {
        
    }
};