declare module "*.svg?inline" {
  const content: unknown;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
