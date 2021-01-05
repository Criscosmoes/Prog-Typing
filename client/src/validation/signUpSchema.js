import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be atleast 4 characters")
    .strict(true)
    .trim("cannot include leading or trailing spaces")
    .matches(/^\S*$/, "cannot include leading or trailing spaces"),

  email: yup
    .string()
    .email()
    .required()
    .min(6, "Email must be atleast 6 characters")
    .trim("cannot include leading or trailing spaces")
    .matches(/^\S*$/, "cannot include leading or trailing spaces"),

  password: yup
    .string()
    .required()
    .min(6, "Password must be atleast 6 characters")
    .trim("cannot include leading or trailing spaces")
    .matches(/^\S*$/, "cannot include leading or trailing spaces"),
});
