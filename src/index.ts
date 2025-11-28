import { compile } from "./compiler";
import { filter, getUpgradeValue } from "./filter";

function SUN() {
  return { compile, filter, getUpgradeValue }
}
(window as any).SUN = SUN;