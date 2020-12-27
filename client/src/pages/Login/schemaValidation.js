import * as yup from "yup";

async function loginValidation(data) {
  const schema = yup.object().shape({
    email: yup.string().min(6).required().email(),
    password: yup.string().min(6).required(),
    rememberMe: yup.boolean().required(),
  });

  return await schema.validate(data);
}

export default loginValidation;
