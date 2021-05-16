export interface Tab {
  name: string;
  show: () => void;
  hide: () => void;
}

export class TabNavigator {
  private tabs = new Map<string, Tab>();
  private lastShownTab: Tab;

  public init(initialTab: Tab): this {
    this.addTabs(initialTab);
    this.showByName(initialTab.name);
    return this;
  }

  public static create(initialTab: Tab): TabNavigator {
    return new TabNavigator().init(initialTab);
  }

  public addTabs(...tabs: Array<Tab>): this {
    for (let tab of tabs) {
      this.tabs.set(tab.name, tab);
    }
    return this;
  }

  public showByName(name: string): void {
    let tab = this.tabs.get(name);
    tab.show();
    this.lastShownTab.hide();
    this.lastShownTab = tab;
  }
}
