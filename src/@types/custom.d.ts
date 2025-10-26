/* eslint-disable no-useless-escape */
declare module '\*.svg' {
  const content: React.SFC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '\*.jpg' {
  const content: string;
  export default content;
}

declare module '\*.png' {
  const content: string;
  export default content;
}

declare module '\*.json' {
  const content: string;
  export default content;
}
