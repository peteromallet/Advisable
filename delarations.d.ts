// Allow graphql files to be imported into typescript files
declare module "*.graphql" {
  const value: any;
  export default value;
}

// Allow svg files to be imported into typescript files
declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const value: any;
  export default value;
}