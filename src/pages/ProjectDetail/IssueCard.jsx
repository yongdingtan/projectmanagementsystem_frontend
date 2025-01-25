import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import UserList from "./UserList"
import { useNavigate } from "react-router-dom"

const IssueCard = () => {
    const navigate = useNavigate()
    return (
        <Card className="rounded-md py-1 pb-2">
            <CardHeader className="py-0 pb-1">
                <div className="flex justify-between items-center">
                    <CardTitle className="cursor-pointer" onClick={() => navigate("/project/3/issue/10")}>
                        Issue
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
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="py-0">
                <div className="flex items-center justify-between">
                    <p>FBP - {1}</p>
                    <DropdownMenu className="w-[30rem] border border-red-400">
                        <DropdownMenuTrigger>
                            <Button
                                size="icon"
                                className="bg-gray-900 text-white hover:bg-gray-700 hover:text-black rounded-full">
                                <Avatar>
                                    <AvatarFallback>
                                        <PersonIcon />
                                    </AvatarFallback>
                                </Avatar>
                            </Button>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <UserList/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}

export default IssueCard
