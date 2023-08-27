const validate = (form) => {
  let error = {};
  if (form.name || form.name === "") {
    if (form.name.length < 5) {
      error.name = "The number must have more than 5 characters";
    } else if (form.name.length > 20) {
      error.name = "The name must have more than 20 characters";
    }
  }

  if (form.summary || form.summary === "") {
    if (form.summary.length < 10) {
      error.summary = "The summary is too short";
    } else if (form.summary.length > 299) {
      error.summary = "The summary is too long";
    }
  }

  if (form.diets) {
    if (form.diets.length === 0) {
      error.diets = "You must select a recipe";
    }
  }

  return error;
};

export default validate;
