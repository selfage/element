import EventEmitter = require("events");

export declare interface ButtonController {
  on(event: "enable", listener: () => void): this;
  on(event: "disable", listener: () => void): this;
  // Returns true to keep the button disabled after click. Otherwise it will be
  // re-enabled.
  on(event: "click", listener: () => Promise<boolean | undefined>): this;
  on(event: "hover", listener: () => void): this;
  on(event: "down", listener: () => void): this;
  on(event: "up", listener: () => void): this;
  on(event: "leave", listener: () => void): this;
}

export class ButtonController extends EventEmitter {
  private displayStyle: string;
  private cursorStyle: string;

  public constructor(private button: HTMLButtonElement) {
    super();
  }

  public static create(button: HTMLButtonElement): ButtonController {
    return new ButtonController(button).init();
  }

  public init(): this {
    this.button.type = "button";
    this.displayStyle = this.button.style.display;
    this.cursorStyle = this.button.style.cursor;
    this.button.addEventListener("click", () => this.click());
    this.button.addEventListener("mouseenter", () => this.hover());
    this.button.addEventListener("mousedown", () => this.down());
    this.button.addEventListener("mouseup", () => this.up());
    this.button.addEventListener("mouseleave", () => this.leave());
    return this;
  }

  public enable(): void {
    this.button.style.cursor = this.cursorStyle;
    this.button.disabled = false;
    this.emit("enable");
  }

  public disable(): void {
    this.button.style.cursor = "not-allowed";
    this.button.disabled = true;
    this.emit("disable");
  }

  public async click(): Promise<void> {
    this.disable();
    let keepDisabled = false;
    try {
      let keepDisableds = await Promise.all(
        this.listeners("click").map((callback) => callback())
      );
      keepDisabled = keepDisableds.some((res) => res);
    } finally {
      if (!keepDisabled) {
        this.enable();
      }
    }
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
    this.button.style.display = this.displayStyle;
  }

  public hide(): void {
    this.button.style.display = "none";
  }
}
