// Entity
export const SIZE = 32; // In pixels
export const HITBOX = .8 / 2;

export const ACCELERATION = 10;
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

export const SHOOT_OFFSET = 15;
export const KNOCK_FORCE = 200;
export const KNOCK_RADIUS = 500;
export const INVULNERABLE_TIME = 1.5;

// Enemy
export const ENEMY_DMG = 3;

// Gun
export const CROSSHAIR = 'shot.svg';
export const GUN_DMG = 1;
export const FIRE_RATE = 5;
export const FIRE_FORCE = 12;
export const GUN_SHOTS = 1;
export const GUN_BURST = 1;
export const GUN_SPREAD = 45 * (Math.PI / 180);
export const RELOAD_TIME = 1;
export const AMMO = 10;

export const MAX_SPREAD = 10 * (Math.PI / 180);
export const MAX_PRIMARY_RELOAD = 2 * Math.PI * 14;
export const MAX_SECONDARY_RELOAD = 2 * Math.PI * 5;

export const RELOAD_CIRCLE = 'assets/img/icons/reload_circle.svg';

// Projectile
export const PROJ_SIZE = 32; // In pixels
export const PROJ_HITBOX = .5 / 2;

export const PROJ_ACCELERATION = 0;
export const PROJ_FRICTION = 1;

export const PROJ_DURATION = 2;
export const PROJ_IMPACT = 10;

// Effects
export const FX_INTENSITY = .1;
export const FX_DURATION = 0.2;
export const FX_INTERVAL = .3;