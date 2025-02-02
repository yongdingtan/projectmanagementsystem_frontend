/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/action";

// Reusable FormField component to reduce repetition
const CustomFormField = ({ name, placeholder, type = "text", control }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            type={type}
            className="border w-full border-gray-700 py-3 px-4 text-white"
            placeholder={placeholder}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const Login = () => {
  const dispatch = useDispatch()
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    console.log("Form Data: ", data)
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
          />
          <CustomFormField
            name="password"
            placeholder="Password"
            type="password"
            control={form.control}
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