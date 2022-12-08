import {FormEvent} from 'react'
import { useRouter } from 'next/router'
import useStore from '../store'
import { useMutateTask } from '../hooks/useMutateTask'

export const TaskForm = () => {
    const {createTaskMutation, updateTaskMutation} = useMutateTask()
    const {editedTask} = useStore()
    const update = useStore((state) => state.updateEditedTask)
    const router = useRouter()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(editedTask.taskId === ""){
            createTaskMutation.mutate({
                priority: editedTask.priority,
                title: editedTask.title,
                body: editedTask.body,
            })
        }else{
            updateTaskMutation.mutate({
                taskId: editedTask.taskId,
                priority: editedTask.priority,
                title: editedTask.title,
                body: editedTask.body,
            })
        }
        router.push("/")
    }

    return (
        <form onSubmit={handleSubmit} className="mb-5 text-center">
            {(updateTaskMutation.isLoading || createTaskMutation.isLoading) && 
            (<p className='mb-2 text-green-500'>Mutation under process...</p>)}
            <div>
                <select
                    className='mb-3 border border-gray-300 px-5 py-2'
                    onChange={(e) => update({...editedTask, priority: Number(e.target.value)})}
                >
                    <option value={0}>-- Select Priority --</option>
                    <option value={3}>Hight</option>
                    <option value={2}>Common</option>
                    <option value={1}>Low</option>
                </select>
            </div>
            <input
                type={"text"}
                className="mb-3 border border-gray-300 px-3 py-2"
                placeholder='Title'
                value={editedTask.title || ""}
                onChange={(e) => update({...editedTask, title: e.target.value})}
            />
            <p className='mb-3 text-pink-500'>
                {createTaskMutation.error?.data?.zodError &&
                    createTaskMutation.error.data.zodError.fieldErrors.title}
            </p>
            <textarea 
                className='mb-3 border border-gray-300 px-3 py-2'
                placeholder='Body'
                value={editedTask.body || ""}
                onChange={(e) => update({...editedTask, body: e.target.value})}
            />
            <p className='mb-3 text-pink-500'>
                {createTaskMutation.error?.data?.zodError &&
                    createTaskMutation.error.data.zodError.fieldErrors.body}
            </p>
            <button className='rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo700 focus:outline-none'>
                {editedTask.taskId === "" ? "Create" : "Update"}
            </button>
        </form>
    )
}
