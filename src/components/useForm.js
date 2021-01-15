import { useState, useEffect } from "react";
import Api from '../client/Api';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function handleSignup(event) {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    // send user data to database
    await Api.insertUser(values)
    .then(result => {
        console.log(values)
    })

  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log('isSubmitting: ', isSubmitting);
    }
  }, [errors, isSubmitting]);

  return { handleChange, handleSignup, values, errors };
};

export default useForm;
