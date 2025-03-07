import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { assignUserToIssue } from '../../redux/issue/action'

const UserList = (issueDetails) => {
  const {project} = useSelector(store => store)
  const dispatch = useDispatch()
  const handleAssignUserToIssue = (userId) => {
    dispatch(assignUserToIssue({issueId:issueDetails.issueDetails.id, userId}))
  }
  return (
    <>
    <div className="space-y-2">
        <div className="border rounded-md">
            <p className="py-2 px-3"> {issueDetails.issueDetails.assignee?.fullName || "Unassigned"} </p>
        </div>
        {project.project.team.members?.map((item) =><div 
        onClick = {() => handleAssignUserToIssue(item.id)}
        key = {item} className='py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4'>
            <Avatar>
                <AvatarFallback>
                    {item.fullName[0]}
                </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p className='text-sm leading-none'>{item.fullName}</p>
                <p className='text-sm text-muted-foreground'>Test</p>
            </div>
        </div>)}
    </div>
    </>
  )
}

export default UserList
