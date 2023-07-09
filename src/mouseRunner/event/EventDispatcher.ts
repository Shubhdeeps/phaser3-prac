let instance: Phaser.Events.EventEmitter | null = null;

export default class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    if (instance === null) {
      instance = this;
    }
  }
  static getInstance(): Phaser.Events.EventEmitter {
    if (instance === null) {
      instance = new EventDispatcher();
    }
    return instance;
  }
}
