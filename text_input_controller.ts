import EventEmitter = require("events");

export declare interface TextInputController {
  on(event: "enter", listener: () => Promise<void>): this;
  on(event: string, listener: Function): this;
}

export class TextInputController extends EventEmitter {
  public constructor(private input: HTMLInputElement) {
    super();
  }

  public static create(input: HTMLInputElement): TextInputController {
    return new TextInputController(input).init();
  }

  public init(): this {
    this.input.type = "text";
    this.input.addEventListener("keydown", this.keydown);
    return this;
  }

  public keydown = (event: KeyboardEvent): void => {
    if (event.code !== "Enter") {
      return;
    }
    this.emit("enter");
  };

  public async enter(): Promise<void> {
    await Promise.all(this.listeners("enter").map((callback) => callback()));
  }
}
