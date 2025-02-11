/* eslint-disable react/prop-types */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue, fetchIssues } from "../../redux/issue/action"; // Import fetchIssues

const IssueCard = ({ item, projectID }) => { // Add projectID as a prop
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteIssue = async () => {
        try {
            await dispatch(deleteIssue(item.id)); // Dispatch deleteIssue
            dispatch(fetchIssues(projectID)); // Refetch issues after deletion using projectID
        } catch (error) {
            console.error("Failed to delete issue:", error);
        }
    };

    return (
        <Card className="rounded-md py-1 pb-2">
            <CardHeader className="py-0 pb-1">
                <div className="flex justify-between items-center">
                    <CardTitle className="cursor-pointer" onClick={() => navigate(`/project/${projectID}/issue/${item.id}`)}>
                        {item?.title}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="rounded-full" size="icon" variant="ghost">
                                <DotsVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                In progress
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Done
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDeleteIssue}> {/* Use handleDeleteIssue */}
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="py-0">
                <div className="flex items-center justify-between">
                    <p>{item?.description}</p>
                    <DropdownMenu className="w-[30rem] border border-red-400">
                        <DropdownMenuTrigger>
                            <Button
                                size="icon"
                                className="bg-gray-900 text-white hover:bg-gray-700 hover:text-black rounded-full">
                                <Avatar className="cursor-pointer ">
                                    <AvatarFallback className="text-black dark:text-white">
                                        {item?.reporter.fullName[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <UserList issueDetails = {item} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};

export default IssueCard;