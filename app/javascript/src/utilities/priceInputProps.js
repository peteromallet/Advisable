import createNumberMask from "text-mask-addons/dist/createNumberMask";

const mask = createNumberMask({
  prefix: "",
});

const priceInputProps = (formik, name) => {
  let value = formik.values[name];

  if (typeof value === "string") {
    value = value.replace(/[^0-9\.-]+/g, "");
  }

  return {
    mask: mask,
    prefix: "$",
    value: value ? Number(value) / 100.0 : "",
    onChange: e => {
      const nextValue = e.target.value;
      const stripped = nextValue.replace(/[^0-9\.-]+/g, "");
      const val = stripped ? Number(stripped) * 100 : undefined;
      formik.setFieldValue(name, val);
    },
  };
};

export default priceInputProps;
