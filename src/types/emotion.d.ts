import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    foreground: string;
    background: string;
    faded: string;
  }
}
