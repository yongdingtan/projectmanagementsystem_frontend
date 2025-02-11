/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/auth/action";
import { deleteComment, fetchComments } from "../../redux/comment/action";

const CommentCard = ({ item, issueId }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

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
                        {user?.fullName?.charAt(0) || "U"} {/* Display the first letter of the user's name */}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>{item.user?.fullName}</p> {/* Display the user's full name */}
                    <p>{item?.content}</p> {/* Display the comment content */}
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