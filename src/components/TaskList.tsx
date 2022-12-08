import { trpc } from "../utils/trpc"
import {TaskItem} from "./TaskItem"

export const TaskList = () => {
    const {isLoading, error} = trpc.todo.getTasks.useQuery()
    let {data} = trpc.todo.getTasks.useQuery()
    if(isLoading){
        return <p>Loading task list...</p>
    }
    if(error){
        return <p>{error.message}</p>
    }
    return (
        <>
            <button onClick={() => ({data} = trpc.todo.getTasks.useQuery())}>更新</button>
            <ul>
                {data?.map((task) => (
                    <TaskItem
                        key={task.id}
                        taskId={task.id}
                        priority={task.priority}
                        title={task.title}
                        body={task.body}
                    />
                ))}
            </ul>
        </>
       
    )
}
