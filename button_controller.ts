import EventEmitter = require("events");

export declare interface ButtonController {
  on(event: "enable", listener: () => void): this;
  on(event: "disable", listener: () => void): this;
  on(event: "click", listener: () => Promise<void>): this;
  on(event: "hover", listener: () => void): this;
  on(event: "down", listener: () => void): this;
  on(event: "up", listener: () => void): this;
  on(event: "leave", listener: () => void): this;
  on(event: string, listener: Function): this;
}

export class ButtonController extends EventEmitter {
  public enable: () => void = this.enableEffective;

  private displayStyle: string;

  public constructor(private button: HTMLButtonElement) {
    super();
  }

  public static create(button: HTMLButtonElement): ButtonController {
    return new ButtonController(button).init();
  }

  public init(): this {
    this.button.type = "button";
    this.displayStyle = this.button.style.display;
    this.enable();
    return this;
  }

  public enableEffective(): void {
    this.emit("enable");
    this.button.addEventListener("click", this.click);
    this.button.addEventListener("mouseenter", this.hover);
    this.button.addEventListener("mousedown", this.down);
    this.button.addEventListener("mouseup", this.up);
    this.button.addEventListener("mouseleave", this.leave);
  }

  public enableNoop(): void {
    // Noop.
  }

  public click = async (): Promise<void> => {
    this.disable();
    try {
      await Promise.all(this.listeners("click").map((callback) => callback()));
    } finally {
      this.enable();
    }
  };

  public disable(): void {
    this.button.style.cursor = "not-allowed";
    this.emit("disable");
    this.button.removeEventListener("click", this.click);
    this.button.removeEventListener("mouseenter", this.hover);
    this.button.removeEventListener("mousedown", this.down);
    this.button.removeEventListener("mouseup", this.up);
    this.button.removeEventListener("mouseleave", this.leave);
  }

  public forceDisable(): void {
    this.disable();
    this.enable = this.enableNoop;
  }

  public restoreEnable(): void {
    this.enable = this.enableEffective;
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
