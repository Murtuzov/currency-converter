export const parseErrors = ({ errors }, form) => {
  Object.entries(errors).forEach(([key, value]) => {
    let arr = key.split(".");

    if (arr.length <= 1) {
      form[key].errors = value;
    } else {
      let [parent, index, child] = arr;
      form[parent].value[index][child].errors = value;
    }
  });
};

export const resetErrors = (form) => {
  Object.keys(form).forEach((item) => {
    form[item].errors = [];
    if (item === "translations") {
      form[item].value.forEach((value) => {
        Object.values(value).forEach((e) => {
          e.errors = [];
        });
      });
    }
  });
};

export function formatPrice(price) {
  if (price) {
    return (
      parseFloat(price).toLocaleString("ru-RU", {
        maximumFractionDigits: 0,
      }) + " ₽"
    );
  }
  return 0 + " ₽";
}

export const dateFormat = "YYYY-MM-DD HH:mm:ss";
