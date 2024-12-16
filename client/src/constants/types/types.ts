export interface MenuItem {
  title: string;
  url: string;
  icon: string;
  // shortcut: string[];
  // isActive: boolean;
  items: MenuItem[];
}
