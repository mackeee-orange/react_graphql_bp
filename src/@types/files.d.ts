declare module "*package.*.json" {
  const data: { version: string };
  export default data;
}

declare module "*.json" {
  const data: unknown;
  export default data;
}
