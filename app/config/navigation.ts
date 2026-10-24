export type NavIcon = "hex" | "trophy" | "doc" | "phone";

export interface NavItem {
  id: string;
  label: string;
  icon: NavIcon;
  to?: string;
}

export const navItems: NavItem[] = [
  { id: "products", label: "لیست محصولات", icon: "hex", to: "/" },
  { id: "consult", label: "دریافت مشاوره", icon: "trophy" },
  { id: "faq", label: "سوالات متداول", icon: "doc" },
  { id: "contact", label: "تماس با ما", icon: "phone" },
];

export function isNavItemCurrent(path: string, item: NavItem) {
  if (!item.to) {
    return false;
  }

  if (item.to === "/") {
    return path === "/" || path.startsWith("/products");
  }

  return path === item.to || path.startsWith(`${item.to}/`);
}
