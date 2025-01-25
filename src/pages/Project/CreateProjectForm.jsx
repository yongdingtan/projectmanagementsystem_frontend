/* eslint-disable no-constant-condition */
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tags } from "../ProjectList/ProjectList"
import { Cross1Icon } from "@radix-ui/react-icons"

const CreateProjectForm = () => {

  const handleTagsChange = (tag) => {
    const currentTags = form.getValues("tags") 
    const updateTags = currentTags.includes(tag) ? currentTags.filter(item => item !== tag) : [...currentTags, tag]
    form.setValue("tags", updateTags)
  }
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    }
  })

  const onSubmit = (data) => { console.log("Create project data", data) }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control}
            name="name"
            render={({ field }) => <FormItem>
              <FormControl>
                <Input {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Project Name"
                  defaultValue="" />
              </FormControl>
              <FormMessage />
            </FormItem>} />
          <FormField control={form.control}
            name="description"
            render={({ field }) => <FormItem>
              <FormControl>
                <Input {...field}
                  type="text"
                  className="border w-full border-gray-700 py-5 px-5"
                  placeholder="Project Description"/>
              </FormControl>
              <FormMessage />
            </FormItem>} />
          <FormField control={form.control}
            name="category"
            render={({ field }) => <FormItem>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullStack">
                      Full Stack
                    </SelectItem>
                    <SelectItem value="frontEnd">
                      Frontend
                    </SelectItem>
                    <SelectItem value="backEnd">
                      Backend
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>} />
          <FormField control={form.control}
            name="tags"
            render={({ field }) => <FormItem>
              <FormControl>
                <Select
                  onValueChange={(value) => handleTagsChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((item) => <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="flex gap-1 flex-wrap" defaultValue="">
                {field.value.map((item) => <div key={item} onClick={() => handleTagsChange(item)} className="cursor-pointer flex rounded-full items-center border gap-3 px-2 py-1">
                  <span className="text-sm">{item}</span>
                  <Cross1Icon className="h-3 w-3" />
                </div>)}
              </div>
              <FormMessage />
            </FormItem>}/>
          <DialogClose>
            {false ? (<div><p>You can only create 3 projects with the free plan. Upgrade to create more projects.</p></div>)
              : (<Button type="submit" className="w-full mt-5">Create Project</Button>)}
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateProjectForm
