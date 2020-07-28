class DonePlugin {
  _func: Function;

  constructor(func) {
    this._func = func;
  }

  apply(compiler) {
    compiler.plugin("done", () => {
      this._func();
    });
  }
}

module.exports = DonePlugin;
