export class TabsSwitcher {
  private hidePreviousTab: () => void = () => {};

  public create(): TabsSwitcher {
    return new TabsSwitcher();
  }

  public async show(
    showTab: () => Promise<void> | void,
    hideTab: () => void
  ): Promise<void> {
    this.hidePreviousTab();
    await showTab();
    this.hidePreviousTab = hideTab;
  }
}
