import EventEmitter = require("events");

export declare interface ButtonController {
  on(event: "enable", listener: () => void): this;
  on(event: "disable", listener: () => void): this;
  // Returns true to enable the button after click. Otherwise keep disabled.
  on(event: "click", listener: () => Promise<boolean>): this;
  on(event: "hover", listener: () => void): this;
  on(event: "down", listener: () => void): this;
  on(event: "up", listener: () => void): this;
  on(event: "leave", listener: () => void): this;
  on(event: string, listener: Function): this;
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
    this.button.addEventListener("click", this.click);
    this.button.addEventListener("mouseenter", this.hover);
    this.button.addEventListener("mousedown", this.down);
    this.button.addEventListener("mouseup", this.up);
    this.button.addEventListener("mouseleave", this.leave);
    return this;
  }

  public enable(): void {
    this.button.style.cursor = this.cursorStyle;
    this.button.disabled = false;
    this.emit("enable");
  }

  public click = async (): Promise<void> => {
    this.disable();
    let toEnable = false;
    try {
      let results = await Promise.all(
        this.listeners("click").map((callback) => callback())
      );
      toEnable = !results.some((res) => !res);
    } finally {
      if (toEnable) {
        this.enable();
      }
    }
  };

  public disable(): void {
    this.button.style.cursor = "not-allowed";
    this.button.disabled = true;
    this.emit("disable");
  }

  public hover = (): void => {
    this.emit("hover");
  };

  public down = (): void => {
    this.hover();
    this.emit("down");
  };

  public up = (): void => {
    this.emit("up");
  };

  public leave = (): void => {
    this.up();
    this.emit("leave");
  };

  public show(): void {
    this.button.style.display = this.displayStyle;
  }

  public hide(): void {
    this.button.style.display = "none";
  }
}
