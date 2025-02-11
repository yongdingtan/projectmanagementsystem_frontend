/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import IssueCard from './IssueCard'; // Import IssueCard
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { fetchIssues } from "../../redux/issue/action";
import { fetchProjectById } from "../../redux/project/action";

const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    const { issue } = useSelector(store => store);
    const { id: projectID } = useParams();
    // Fetch issues when projectID changes
    useEffect(() => {
        dispatch(fetchIssues(projectID));
    }, [projectID, dispatch]);

    return (
        <div>
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[300px]">
                    <CardHeader>
                        <CardTitle>
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className='space-y-2'>
                            {issue.issues?.filter((issue => issue.status == status)).map((item) => ( // Map through issues
                                <IssueCard
                                    key={item.id}
                                    item={item}
                                    projectID={projectID} // Pass projectID as a prop
                                />
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <DialogTrigger>
                            <Button variant="outline" className="w-full flex items-center gap-2">
                                <PlusIcon />
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Create Issue
                        </DialogTitle>
                    </DialogHeader>
                    {/* Pass status directly to CreateIssueForm */}
                    <CreateIssueForm status={status} projectID={projectID} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IssueList;