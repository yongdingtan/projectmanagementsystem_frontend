import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "../../redux/issue/action";
import { fetchComments } from "../../redux/comment/action";

const IssueDetail = () => {
    const { issueId } = useParams();
    const dispatch = useDispatch();
    const { issue, comment } = useSelector((store) => store);

    const handleUpdateIssueStatus = async (status) => {
        await dispatch(updateIssueStatus(issueId, status));
        dispatch(fetchIssueById(issueId));
    };

    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId)); // Fetch comments for the specific issue
    }, [issueId, dispatch]);

    return (
        <div className="px-20 py-8 text-black dark:text-white">
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold">{issue.issueDetails?.title}</h1>
                        <div className="py-5">
                            <h2 className="font-semibold">Description</h2>
                            <p className="text-sm mt-3">{issue.issueDetails?.description}</p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3">Activity</h1>
                            <Tabs defaultValue="comments" className="w-[400px]">
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">WIP</TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />
                                    <div className="mt-8 space-y-6">
                                        {comment.comments?.map((item, index) => (
                                            <CommentCard
                                                item={item}
                                                issueId={issueId}
                                                key={item?.id || index} // Use item.id if defined, otherwise fallback to index
                                            />
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="history">WIP</TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus} defaultValue={issue.status}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border rounded-lg">
                        <p className="border-b py-3 px-5">Details</p>
                        <div className="p-5">
                            <div className="space-y-7">
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Assignee</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 text-xs">
                                            <AvatarFallback>
                                                {issue.issueDetails?.assignee?.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>{issue.issueDetails?.assignee?.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Priority</p>
                                    <p>{issue.issueDetails?.priority}</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Labels</p>
                                    <p>{issue.issueDetails?.tags}</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Status</p>
                                    <Badge>
                                        {issue.issueDetails?.status}
                                    </Badge>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Created</p>
                                    <p>{issue.issueDetails?.createdDate}</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Due</p>
                                    <p>{issue.issueDetails?.dueDate}</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]">Reporter</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 text-xs">
                                            <AvatarFallback>
                                                {issue.issueDetails?.reporter.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>{issue.issueDetails?.reporter.fullName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetail;