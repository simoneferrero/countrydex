import type { Theme } from "types/Theme";

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
