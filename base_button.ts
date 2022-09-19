import EventEmitter = require("events");
import { E } from "./factory";

export declare interface BaseButton {
  on(event: "enable", listener: () => void): this;
  on(event: "disable", listener: () => void): this;
  on(event: "click", listener: () => Promise<void>): this;
  on(event: "afterClick", listener: (error?: Error) => void): this;
  on(event: "hover", listener: () => void): this;
  on(event: "down", listener: () => void): this;
  on(event: "up", listener: () => void): this;
  on(event: "leave", listener: () => void): this;
}

export class BaseButton extends EventEmitter {
  public body: HTMLButtonElement;
  private displayStyle: string;
  private cursorStyle: string;

  public constructor(customStyle: string) {
    super();
    this.body = E.button({
      class: "base-button",
      style: customStyle,
      type: "button",
    });
    this.displayStyle = this.body.style.display;
    this.cursorStyle = this.body.style.cursor;
    this.body.addEventListener("click", () => this.click());
    this.body.addEventListener("mouseenter", () => this.hover());
    this.body.addEventListener("mousedown", () => this.down());
    this.body.addEventListener("mouseup", () => this.up());
    this.body.addEventListener("mouseleave", () => this.leave());
  }

  public enable(): void {
    this.body.style.cursor = this.cursorStyle;
    this.emit("enable");
  }

  public disable(): void {
    this.body.style.cursor = "not-allowed";
    this.emit("disable");
  }

  public async click(): Promise<void> {
    this.disable();
    try {
      await Promise.all(
        this.listeners("click").map((callback) => callback())
      );
    } catch (e) {
      this.enable();
      this.emit("afterClick", e);
      return;
    }
    this.enable();
    this.emit("afterClick");
  }

  public hover(): void {
    this.emit("hover");
  }

  public down(): void {
    this.hover();
    this.emit("down");
  }

  public up(): void {
    this.emit("up");
  }

  public leave(): void {
    this.up();
    this.emit("leave");
  }

  public show(): void {
    this.body.style.display = this.displayStyle;
  }

  public hide(): void {
    this.body.style.display = "none";
  }
}
