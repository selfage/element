export class HideableElementController {
  private displayStyle: string;

  public constructor(private element: HTMLElement) {}

  public hide(): void {
    this.displayStyle = this.element.style.display;
    this.element.style.display = "none";
    this.element.hidden = true;
  }

  public show(): void {
    if (this.displayStyle) {
      this.element.style.display = this.displayStyle;
    }
    this.element.hidden = false;
  }
}
