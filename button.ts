import EventEmitter = require("events");
import { E } from "./factory";
import { Ref, assign } from "@selfage/ref";

export declare interface Button {
  on(event: "enable", listener: () => void): this;
  on(event: "disable", listener: () => void): this;
  on(event: "click", listener: () => Promise<void>): this;
  on(event: "hover", listener: () => void): this;
  on(event: "down", listener: () => void): this;
  on(event: "up", listener: () => void): this;
  on(event: "leave", listener: () => void): this;
  on(event: string, listener: Function): this;
}

export class Button extends EventEmitter {
  private displayStyle: string;

  public constructor(public ele: HTMLButtonElement) {
    super();
  }

  public static create(attributeStr: string, ...childNodes: Node[]): Button {
    return new Button(E.button(attributeStr, ...childNodes)).init();
  }

  public static createRef(
    ref: Ref<Button>,
    attributeStr: string,
    ...childNodes: Node[]
  ): Button {
    return assign(ref, Button.create(attributeStr, ...childNodes));
  }

  public init(): this {
    this.ele.type = "button";
    this.displayStyle = this.ele.style.display;
    this.enable();
    return this;
  }

  public enable(): void {
    this.ele.style.cursor = "pointer";
    this.emit("enable");
    this.ele.addEventListener("click", this.click);
    this.ele.addEventListener("mouseenter", this.hover);
    this.ele.addEventListener("mousedown", this.down);
    this.ele.addEventListener("mouseup", this.up);
    this.ele.addEventListener("mouseleave", this.leave);
  }

  private click = async (): Promise<void> => {
    this.disable();
    try {
      await Promise.all(this.listeners("click").map((callback) => callback()));
    } finally {
      this.enable();
    }
  };

  public disable(): void {
    this.ele.style.cursor = "not-allowed";
    this.emit("disable");
    this.ele.removeEventListener("click", this.click);
    this.ele.removeEventListener("mouseenter", this.hover);
    this.ele.removeEventListener("mousedown", this.down);
    this.ele.removeEventListener("mouseup", this.up);
    this.ele.removeEventListener("mouseleave", this.leave);
  }

  private hover = (): void => {
    this.emit("hover");
  };

  private down = (): void => {
    this.hover();
    this.emit("down");
  };

  private up = (): void => {
    this.emit("up");
  };

  private leave = (): void => {
    this.up();
    this.emit("leave");
  };

  public show(): void {
    this.ele.style.display = this.displayStyle;
  }

  public hide(): void {
    this.ele.style.display = "none";
  }

  public triggerClick(): void {
    this.ele.click();
  }
}
