/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { createIssue, fetchIssues } from "../../redux/issue/action"

const CreateIssueForm = ({ status, projectID }) => {
  const dispatch = useDispatch();

  // Initialize the form with default values
  const form = useForm({
      defaultValues: {
          issueName: "",
          description: "",
          projectId: projectID, // Set projectId directly
          status: status, // Use status directly
      },
  });

  // Handle form submission
  const onSubmit = async (data) => {
      try {
          // Dispatch the createIssue action with the required data
          await dispatch(
              createIssue({
                  title: data.issueName,
                  status: status, // Use status directly
                  projectId: projectID, // Use projectID directly
                  description: data.description
              })
          );

          // Refetch issues after creating a new one
          dispatch(fetchIssues(projectID));
      } catch (error) {
          console.error("Failed to create issue:", error);
      }
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control}
            name="issueName"
            render={({ field }) => ( <FormItem>
              <FormControl>
                <Input {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Issue Name"/>
              </FormControl>
              <FormMessage />
            </FormItem>)} />
            <FormField control={form.control}
            name="description"
            render={({ field }) => ( <FormItem>
              <FormControl>
                <Input {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Description"/>
              </FormControl>
              <FormMessage />
            </FormItem>)} />
            <DialogClose>
                <Button type="submit" className="w-full mt-5">
                    Create Issue
                </Button>
            </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateIssueForm
