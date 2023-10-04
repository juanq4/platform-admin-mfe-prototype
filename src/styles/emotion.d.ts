import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    // /**
    //  * Use https://zeroheight.com/8b41e2a13/p/08b95a-colors to name colours!
    //  * If not found, you may use http://chir.ag/projects/name-that-color as an alternative.
    //  * RGBA colors should follow convention [colour_name][opacity_percent]
    //  * e.g. rgba(0, 0, 0, 0.12) = black12
    //  */
    colors: {
      gray2: string;
      neutral50: string;
      neutral100: string;
      neutral500: string;
      neutral700: string;
      primary50: string;
      primary700: string;
      primary900: string;
      porcelain: string;
      q4Blue: string;
      secondary500: string;
      secondary700: string;
      transparent: string;
      white: string;
      slate: string;
      darkSlate: string;
      lightSlate: string;
      danger: string;
    };
    typography: {
      openSans: string;
    };
  }
}
