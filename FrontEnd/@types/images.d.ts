/**
 * This is copied from https://github.com/twopluszero/next-images/blob/master/index.d.ts#L17
 * for next-images (https://github.com/twopluszero/next-images). You can normally just
 * import it but we need to have a different declaration for ".svg" file types since
 * we're using babel-plugin-inline-react-svg (https://github.com/airbnb/babel-plugin-inline-react-svg).
 */

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.gif' {
  const value: string;
  export = value;
}

declare module '*.ico' {
  const value: string;
  export = value;
}

declare module '*.webp' {
  const value: string;
  export = value;
}

declare module '*.jp2' {
  const value: string;
  export = value;
}

declare module '*.avif' {
  const value: string;
  export = value;
}
