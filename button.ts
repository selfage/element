import EventEmitter = require("events");
import { E } from "./factory";
import { Ref, assign } from "@selfage/ref";

export enum ButtonEventType {
  ENABLE = 1,
  DISABLE = 2,
  CLICK = 3,
  HOVER = 4,
  DOWN = 5,
  UP = 6,
  LEAVE = 7,
}

export class Button {
  private eventEmitter = new EventEmitter();
  private displayStyle: string;

  public constructor(public element: HTMLButtonElement) {}

  public static create(attributeStr: string, ...childNodes: Node[]): Button {
    let button = new Button(E.button(attributeStr, ...childNodes));
    button.init();
    return button;
  }

  public static createRef(
    ref: Ref<Button>,
    attributeStr: string,
    ...childNodes: Node[]
  ): Button {
    return assign(ref, Button.create(attributeStr, ...childNodes));
  }

  public init(): void {
    this.element.type = "button";
    this.displayStyle = this.element.style.display;
    this.enable();
  }

  public on(
    eventType: ButtonEventType,
    callback: () => Promise<void> | void
  ): void {
    this.eventEmitter.on(ButtonEventType[eventType], callback);
  }

  public off(
    eventType: ButtonEventType,
    callback: () => Promise<void> | void
  ): void {
    this.eventEmitter.off(ButtonEventType[eventType], callback);
  }

  private enable(): void {
    this.element.style.cursor = "pointer";
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.ENABLE]);
    this.element.addEventListener("click", this.click);
    this.element.addEventListener("mouseenter", this.hover);
    this.element.addEventListener("mousedown", this.down);
    this.element.addEventListener("mouseup", this.up);
    this.element.addEventListener("mouseleave", this.leave);
  }

  private click = async (): Promise<void> => {
    this.disable();
    try {
      await Promise.all(
        this.eventEmitter
          .listeners(ButtonEventType[ButtonEventType.CLICK])
          .map((callback) => callback())
      );
    } finally {
      this.enable();
    }
  };

  private disable(): void {
    this.element.style.cursor = "not-allowed";
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.DISABLE]);
    this.element.removeEventListener("click", this.click);
    this.element.removeEventListener("mouseenter", this.hover);
    this.element.removeEventListener("mousedown", this.down);
    this.element.removeEventListener("mouseup", this.up);
    this.element.removeEventListener("mouseleave", this.leave);
  }

  private hover = (): void => {
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.HOVER]);
  };

  private down = (): void => {
    this.hover();
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.DOWN]);
  };

  private up = (): void => {
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.UP]);
  };

  private leave = (): void => {
    this.up();
    this.eventEmitter.emit(ButtonEventType[ButtonEventType.LEAVE]);
  };

  public show(): void {
    this.element.style.display = this.displayStyle;
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public triggerClick(): void {
    this.element.click();
  }
}
