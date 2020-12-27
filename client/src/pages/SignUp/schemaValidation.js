import * as yup from "yup";

async function registerValidation(data) {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      //   .matches(/([A-Za-z])\w+/g, "first name must be letters only")
      .required(),
    lastName: yup
      .string()
      //   .matches(/([A-Za-z])\w+/g, "last name must be letters only")
      .required(),
    email: yup.string().min(6).required().email(),
    password: yup.string().min(6).required(),
    nativeLanguageId: yup.number().required(),
    currentLanguageId: yup.number().required(),
  });
  return await schema.validate(data);
}
export default registerValidation;
