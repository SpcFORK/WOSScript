const module = {
  [Symbol.for('exports')]: {},

  set exports(value) {
    Object.assign(this[Symbol.for('exports')], value)
  },
  get exports() {
    return this[Symbol.for('exports')];
  },
}