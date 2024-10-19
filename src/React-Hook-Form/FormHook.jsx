import * as React from "react";
import { useForm } from "react-hook-form";

function FormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // References for input fields to handle focus
  const firstNameRef = React.useRef(null);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);

    // Reset the form after submission
    reset();

    // Focus back on the first input field
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  };

  const intialValues = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          ref={firstNameRef} // Reference to the firstName field for focusing
          defaultValue={intialValues.firstName}
          placeholder="Enter your First Name"
          {...register("firstName", {
            validate: (value) => value !== "",
          })}
        />
        {errors.firstName && (
          <p style={{ color: "red" }}>Enter Your first name</p>
        )}
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          defaultValue={intialValues.lastName}
          placeholder="Enter your Last Name"
          {...register("lastName", {
            validate: (value) => value !== "",
          })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>Enter Your last name</p>
        )}
        <br />

        <label htmlFor="email">Email</label>
        <input
          defaultValue={intialValues.email}
          placeholder="Enter your Email"
          type="email"
          {...register("email", {
            validate: (value) => value !== "",
          })}
        />
        {errors.email && (
          <p style={{ color: "red" }}>Enter Your email address</p>
        )}
        <br />

        <label htmlFor="age">Age</label>
        <input
          defaultValue={intialValues.age}
          placeholder="Enter your Age"
          type="number"
          {...register("age", {
              validate: (value) => value !== "",
          })}
        />
        {errors.age && <p style={{ color: "red" }}>Enter Your age</p>}

        <br />

        <input className="submit" type="submit" />
      </form>
    </div>
  );
}

export default FormHook;
