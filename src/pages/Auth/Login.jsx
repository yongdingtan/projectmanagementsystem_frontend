/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/action";

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
            className="border w-full border-gray-700 py-3 px-4 text-white"
            placeholder={placeholder}
          />
        </FormControl>
        {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
      </FormItem>
    )}
  />
);

const Login = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("Form Data: ", data);
  };

  return (
    <div className="space-y-5">
      <h1>Login</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
