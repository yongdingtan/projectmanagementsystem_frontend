/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/auth/action";
import { deleteComment, fetchComments } from "../../redux/comment/action";
import { format } from "date-fns";

const CommentCard = ({ item, issueId }) => {

    function formatDateTime(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);

        return format(date, "do MMMM yyyy h:mma"); // Example: 14th March 2025 8:13pm
    }

    const dispatch = useDispatch();
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors
    console.log("item", item)
    // Fetch user data when the component mounts or when item.user.id changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await dispatch(getUserById(item?.user?.id)); // Fetch user data
                setUser(userData); // Update state with fetched user data
            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        if (item?.user?.id) {
            fetchUser(); // Call the fetch function only if item.user.id is defined
        }
    }, [dispatch, item?.user?.id]); // Re-run effect if item.user.id changes

    // Handle delete comment
    const handleDelete = async () => {
        try {
            await dispatch(deleteComment(item.id)); // Dispatch deleteComment action with the comment ID
            dispatch(fetchComments(issueId)); // Re-fetch comments after deletion
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Show error state
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>
                        {item.user?.fullName[0]} {/* Display the first letter of the user's name */}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>{item.user?.fullName} {formatDateTime(item?.createdDateTime)}</p>
                    <p>{item?.content}</p>
                </div>
            </div>
            <Button
                onClick={handleDelete} // Pass the function reference, not the result of the function call
                className="rounded-full"
                variant="ghost"
                size="icon"
            >
                <TrashIcon />
            </Button>
        </div>
    );
};

export default CommentCard;