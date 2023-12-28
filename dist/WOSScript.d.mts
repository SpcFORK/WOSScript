/** WOSScript - A Module building language. */
declare class WOSScript {
    opts: Opts;
    constructor(opts?: Record<string, any> & Opts);
    private upd;
    parse(filestr: string, opts?: Record<string, any> & typeof this.opts): any;
    private abstract;
    exec(code: string, opts?: Opts): any;
}

export { WOSScript as default };
