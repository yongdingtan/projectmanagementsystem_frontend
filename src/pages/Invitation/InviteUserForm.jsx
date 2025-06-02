import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { inviteToProject } from "../../redux/project/action"
import { useParams } from "react-router-dom"

const InviteUserForm = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const jwt = localStorage.getItem("jwt");
    const form = useForm({
        defaultValues: {
        },
    })
    const onSubmit = (data) => {
        dispatch(inviteToProject({email: data.email, projectId: id, jwt}))
        console.log("Email: ", data)
    }
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control}
            name="email"
            render={({ field }) => ( <FormItem>
              <FormControl>
                <Input {...field}
                  type="text"
                  className="border w-full border-gray-700 py-3 px-3"
                  placeholder="enter user email here"/>
              </FormControl>
              <FormMessage />
            </FormItem>)} />
            <DialogClose>
                <Button type="submit" className="w-full mt-5">
                    Invite User
                </Button>
            </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm
