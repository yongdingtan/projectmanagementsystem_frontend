import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from '@radix-ui/react-icons'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'

const ProjectDetail = () => {

    const handleProjectInvitation = () => {
    }

    return (
        <>
            <div className="mt-5 lg:px-10">
                <div className="lg:flex gap-5 justify-between pb-4">
                    <ScrollArea className='h-screen lg:w-[69%] pr-2'>
                        <div className='text-gray-400 pb-10 w-full'>
                            <h1 className='text-lg font-semibold pb-5'>
                                Create Ecommerce website using react
                            </h1>
                            <div className='space-y-5 pb-10'>
                                <p className='w-full md:max-w-lg lg:max-w-xl text-sm'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                </p>
                                <div className='flex'>
                                    <p className='w-36'>Project Lead: </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-36'>Members: </p>
                                    <div className='flex items-center gap-2'>
                                        {[1, 1, 1, 1].map((item) => <Avatar className="cursor-pointer" key={item}>
                                            <AvatarFallback>
                                                Z
                                            </AvatarFallback>
                                        </Avatar>)}
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <DialogClose>
                                                <Button className='ml-3' size='sm' variant='outline' onClick={handleProjectInvitation}>
                                                    <span>Invite</span>
                                                    <PlusIcon className='w-3 h-3' />
                                                </Button>
                                            </DialogClose>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                Invite User
                                            </DialogHeader>
                                            <InviteUserForm/>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className='flex'>
                                    <p className='w-36'>Category: </p>
                                    <p>Placeholder</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-36'>Tags: </p>
                                    <Badge>
                                        Test
                                    </Badge>
                                </div>
                            </div>
                            <section>
                                <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>
                                <div className='lg:flex md:flex gap-3 justify-between py-5'>
                                <IssueList status="pending" title="TODO List"/>
                                <IssueList status="in_progress" title="TODO List"/>
                                <IssueList status="done" title="TODO List"/>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                    <div className='lg:w-[30%] rounded-md sticky right-5 top-10'>
                        <ChatBox/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetail
