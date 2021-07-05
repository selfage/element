import EventEmitter = require("events");

export declare interface TextInputController {
  on(event: "enter", listener: () => void): this;
  on(event: string, listener: Function): this;
}

export class TextInputController extends EventEmitter {
  private static ENTER_KEY_CODE = 13;

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

  private keydown = (event: KeyboardEvent): void => {
    if (event.keyCode !== TextInputController.ENTER_KEY_CODE) {
      return;
    }
    this.emit("enter");
  };
}
