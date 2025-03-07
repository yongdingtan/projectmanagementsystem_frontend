/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/action";
import Popup from "./Popup";

// Reusable FormField component with validation
const CustomFormField = ({ name, placeholder, type = "text", control, rules }) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            type={type}
            className="border w-full border-gray-500 py-3 px-4 text-white"
            placeholder={placeholder}
          />
        </FormControl>
        {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
      </FormItem>
    )}
  />
);

const SignUp = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      setErrorMessage(""); // Clear any previous error messages
      await dispatch(register(data));
      setShowPopup(true); // Show the popup after successful signup
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="space-y-5">
      <h1>Register</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormField
            name="fullName"
            placeholder="Full Name"
            control={form.control}
            rules={{ required: "Full Name is required" }}
          />
          <CustomFormField
            name="email"
            placeholder="Email"
            type="email"
            control={form.control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
          />
          <CustomFormField
            name="password"
            placeholder="Password"
            type="password"
            control={form.control}
            rules={{ required: "Password is required" }}
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <Button type="submit" className="w-full mt-4">
            Register
          </Button>
        </form>
      </Form>

      {showPopup && <Popup message="Register Successful!" onClose={closePopup} />}
    </div>
  );
};

export default SignUp;
