/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import IssueCard from './IssueCard'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { PlusIcon } from "@radix-ui/react-icons"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CreateIssueForm from "./CreateIssueForm"

const IssueList = ({ title, status }) => {
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
                            {[1,1,1].map((item) => <IssueCard key = {item}/>)}
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
                    <CreateIssueForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList
