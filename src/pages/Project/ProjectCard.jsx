/* eslint-disable react/prop-types */
import { Card } from '@/components/ui/Card'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/Button'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProject } from '../../redux/project/action'

const ProjectCard = ({ item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Card className='p-5 w-full lg:max-w-3xl'>
            <div className='space-y-5'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-5'>
                            <h1 onClick={() => navigate(`/project/${item.id}`)} className='cursor-pointer font-bold text-lg'>
                                {item.name}
                            </h1>
                            <DotFilledIcon />
                            <p className='text-sm txtgray-400'> {item.category} </p>
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button className="rounded-full" variant="ghost" size="icon">
                                        <DotsVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        Update
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <button onClick={() => dispatch(deleteProject(item.id))}>
                                            Delete
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p className='text-gray-500 text-sm'>
                        {item.description}
                    </p>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}

                </div>
            </div>
        </Card>
    )
}

export default ProjectCard
