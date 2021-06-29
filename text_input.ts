import EventEmitter = require("events");
import { E } from "./factory";
import { Ref, assign } from "@selfage/ref";

export declare interface TextInput {
  on(event: "enter", listener: () => void): this;
  on(event: string, listener: Function): this;
}

export class TextInput extends EventEmitter {
  private static ENTER_KEY_CODE = 13;

  public constructor(public ele: HTMLInputElement) {
    super();
  }

  public static create(attributes: string): TextInput {
    return new TextInput(E.input(attributes)).init();
  }

  public static createRef(ref: Ref<TextInput>, attributes: string): TextInput {
    return assign(ref, TextInput.create(attributes));
  }

  public init(): this {
    this.ele.type = "text";
    this.ele.addEventListener("keydown", this.keydown);
    return this;
  }

  private keydown = (event: KeyboardEvent): void => {
    if (event.keyCode !== TextInput.ENTER_KEY_CODE) {
      return;
    }
    this.emit("enter");
  };
}
