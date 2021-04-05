import EventEmitter = require("events");
import { E } from "./factory";
import { Ref, assign } from "@selfage/ref";

export enum TextInputEventType {
  ENTER = 1,
}

export class TextInput {
  private static ENTER_KEY_CODE = 13;

  private eventEmitter = new EventEmitter();

  public constructor(public ele: HTMLInputElement) {}

  public static create(attributes: string): TextInput {
    let input = new TextInput(E.input(attributes));
    input.init();
    return input;
  }

  public static createRef(ref: Ref<TextInput>, attributes: string): TextInput {
    return assign(ref, TextInput.create(attributes));
  }

  public init(): void {
    this.ele.type = "text";
    this.ele.addEventListener("keydown", this.keydown);
  }

  public on(
    eventType: TextInputEventType,
    callback: () => Promise<void> | void
  ): void {
    this.eventEmitter.on(TextInputEventType[eventType], callback);
  }

  public off(
    eventType: TextInputEventType,
    callback: () => Promise<void> | void
  ): void {
    this.eventEmitter.off(TextInputEventType[eventType], callback);
  }

  private keydown = (event: KeyboardEvent): void => {
    if (event.keyCode !== TextInput.ENTER_KEY_CODE) {
      return;
    }
    this.eventEmitter.emit(TextInputEventType[TextInputEventType.ENTER]);
  };
}
