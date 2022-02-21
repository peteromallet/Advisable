function resolveClasses(config) {
  if (typeof config === "string") {
    return config.split(" ");
  }

  return config;
}

function resolveVariant(variantConfig, value) {
  if (typeof variantConfig === "string") {
    if (value) {
      return resolveClasses(variantConfig);
    }
  }

  return resolveClasses(variantConfig[value] || []);
}

export default function composeStyles(config) {
  return (props = {}) => {
    const variants = Object.keys(config.variants || {});
    const classes = variants.reduce((output, variant) => {
      if (variant in props) {
        const value = props[variant];
        const variantConfig = config.variants[variant];
        const classes = resolveVariant(variantConfig, value);
        output = [...output, ...classes];
      }
      return output;
    }, resolveClasses(config.base || ""));

    const withClassNameProp = [...classes, props.className];
    return withClassNameProp
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };
}
