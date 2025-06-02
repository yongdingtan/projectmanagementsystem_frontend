/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../../redux/comment/action"; // Import fetchComments

const CreateCommentForm = ({ issueId }) => { // Destructure issueId from props
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);

    const form = useForm({
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(createComment({ content: data.content, issueId, userId: auth.user.id })); // Create the comment
            dispatch(fetchComments(issueId)); // Re-fetch comments after creating a new comment
            form.reset(); // Clear the input field
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-2">
                                    <div>
                                        <Avatar>
                                            <AvatarFallback>
                                                {auth.user.fullName?.charAt(0) || "U"} {/* Display the first letter of the user's name */}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            className="w-[20rem]"
                                            placeholder="Comment"
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="secondary" size="icon" className="size-8" type="submit"><ChevronRightIcon /></Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateCommentForm;