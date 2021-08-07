export class HideableElementController {
  private displayStyle: string;

  public constructor(private element: HTMLElement) {
    this.displayStyle = this.element.style.display;
  }

  public hide(): void {
    this.element.style.display = "none";
    this.element.hidden = true;
  }

  public show(): void {
    this.element.style.display = this.displayStyle;
    this.element.hidden = false;
  }
}
