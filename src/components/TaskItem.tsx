import {FC} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStore from '../store'
import { UpdateTaskInput } from '../schema/todo'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateTask } from '../hooks/useMutateTask'

export const TaskItem: FC<UpdateTaskInput> = ({taskId, priority, title, body}) => {
    const update = useStore((state) => state.updateEditedTask)
    const {deleteTaskMutation} = useMutateTask()
    const router = useRouter()
    return (
        <li>
            <Link href={`/task/${taskId}`}>
                <span className='cursor-pointer'>{title}</span>
            </Link>
            <div className='float-right ml-20 flex'>
                <PencilIcon 
                    className='mx-1 h-5 w-5 cursor-pointer text-blue-600'
                    onClick={() => {
                        update({
                            taskId,
                            priority,
                            title,
                            body,
                        })
                    }}
                />
                <TrashIcon
                    className='h-5 w-5 cursor-pointer text-blue-600'
                    onClick={() => {
                        deleteTaskMutation.mutate({taskId})
                        router.push("/")
                    }}
                    
                />
            </div>
            {deleteTaskMutation.isLoading && (
                <p className='mb-2 text-green-500'>Mutation under process...</p>
            )}
        </li>
    )
}
