import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const CreateIssueForm = () => {
  const form = useForm({
    defaultValues: {
      issueName: '',
      description: '',
    }
  })
  const onSubmit = (data) => {
    console.log("Email: ", data)
  }
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
