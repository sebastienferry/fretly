/**
 * Custom error classes for Fretboard Renderer Library
 */

/**
 * Error thrown when configuration is invalid
 */
export class InvalidConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidConfigurationError';
  }
}

/**
 * Error thrown when a value is out of valid range
 */
export class RangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RangeError';
  }
}

/**
 * Error thrown when a type is invalid
 */
export class TypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TypeError';
  }
}

/**
 * Error thrown when a marker cannot be found
 */
export class MarkerNotFoundError extends Error {
  constructor(markerId: string) {
    super(`Marker with id '${markerId}' not found`);
    this.name = 'MarkerNotFoundError';
  }
}

/**
 * Error thrown when attempting to render without initialization
 */
export class NotInitializedError extends Error {
  constructor() {
    super('Fretboard must be initialized before rendering');
    this.name = 'NotInitializedError';
  }
}
