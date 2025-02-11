/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { createIssue, fetchIssues } from "../../redux/issue/action";
import { getTodayDate } from "../../lib/utils";
import { useState } from "react";

const CreateIssueForm = ({ status, projectID }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { project } = useSelector((store) => store.project);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to control the popover
  // Initialize the form with default values
  const form = useForm({
    defaultValues: {
      issueName: "",
      description: "",
      projectId: projectID, // Set projectId directly
      status: status, // Use status directly
      createdDate: getTodayDate(), // Set today's date as default
      priority: "", // Priority is initially empty
      dueDate: null, // dueDate is initially null
      assignee: null, // Assignee is initially null
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
          description: data.description,
          createdDate: data.createdDate,
          priority: data.priority,
          dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : null, // Format dueDate as LocalDate
          reporter: auth?.user,
          assignee: data.assignee, // Include the selected assignee object
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
          {/* Issue Name Field */}
          <FormField
            control={form.control}
            name="issueName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority Field */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {field.value ? field.value : "Select priority"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Priority</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value); // Update the form field value
                        }}
                      >
                        <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assignee Field */}
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {field.value ? field.value.fullName : "Select assignee"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Assignee</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field.value?.id} // Use the member's ID for the selected value
                        onValueChange={(value) => {
                          // Find the selected member object
                          const selectedMember = project.team?.members.find(member => member.id === value);
                          field.onChange(selectedMember); // Update the form field value with the member object
                        }}
                      >
                        {project.team?.members.map((member) => (
                          <DropdownMenuRadioItem key={member.id} value={member.id}>
                            {member.fullName}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date Field */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover
                  open={isCalendarOpen} // Controlled open state
                  onOpenChange={setIsCalendarOpen} // Update state when open/close
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""
                          }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP") // Format the date as "Month Day, Year"
                        ) : (
                          <span>Pick a due date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date); // Update the form field value
                        setIsCalendarOpen(false); // Close the popover
                      }}
                      disabled={(date) =>
                        date < new Date() // Disable past dates
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Create Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;