// Entity
export const SIZE = 32; // In pixels
export const HITBOX = .8 / 2;

export const ACCELERATION = 5;
export const FRICTION = 3;

// Character
export const LIFE = 10;
export const MASS = 10;

// Player
export const KEY_UP = 'KeyW';
export const KEY_DOWN = 'KeyS';
export const KEY_LEFT = 'KeyA';
export const KEY_RIGHT = 'KeyD';

export const KEY_RELOAD = 'KeyR';
export const KEY_DASH = 'Shift';
export const KEY_LEFT_UTIL = 'Q';
export const KEY_RIGHT_UTIL = 'E';
export const KEY_SPECIAL = 'Space';

export const PLAYER_HITBOX = .5 / 2;

export const PLAYER_ACCELERATION = 32;
export const PLAYER_FRICTION = 5;
export const PLAYER_LIFE = 100;

export const SHOOT_OFFSET = 5;
export const KNOCK_FORCE = 200;
export const KNOCK_RADIUS = 500;
export const INVULNERABLE_TIME = 1.5;

// Enemy
export const ENEMY_DMG = 3;

// Gun
export const CROSSHAIR = 'shot.svg';
export const GUN_DMG = 1;
export const FIRE_RATE = 4;
export const FIRE_FORCE = 8;
export const GUN_SHOTS = 1;
export const GUN_BURST = 1;
export const GUN_SPREAD = 90 * (Math.PI / 180);
export const RELOAD_TIME = 1;
export const AMMO = 10;

export const MAX_RATE = 8;
export const MIN_SPREAD = 15 * (Math.PI / 180);
export const MAX_BURST = 3;

export const RELOAD_SIZE = 6;
export const RELOAD_WIDTH = 2;

// Projectile
export const PROJ_SIZE = 32; // In pixels
export const PROJ_HITBOX = .5 / 2;

export const PROJ_ACCELERATION = 0;
export const PROJ_FRICTION = .5;

export const PROJ_DURATION = 2;
export const PROJ_IMPACT = 10;

// Effects
export const FX_INTENSITY = .1;
export const FX_DURATION = 0.2;
export const FX_INTERVAL = .3;