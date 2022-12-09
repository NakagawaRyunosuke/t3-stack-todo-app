import useStore from "../store"
import { trpc } from "../utils/trpc"

export const useMutateTask = () => {
    const utils = trpc.useContext()
    const reset = useStore((state) => state.resetEditedTask)

    const createTaskMutation = trpc.todo.createTask.useMutation({
        onSuccess: (res) => {
            const previousTodos = utils.todo.getTasks.getData()
            if(previousTodos){
                const newTodos = [res, ...previousTodos].sort((a, b) => {
                    if(a.priority > b.priority){
                        return -1
                    }else if(a.priority < b.priority){
                        return 1
                    }else{
                        return 0
                    }
                })
                console.log(newTodos)
                utils.todo.getTasks.setData([res, ...previousTodos])
            }
            reset()
        }
    })

    const updateTaskMutation = trpc.todo.updateTask.useMutation({
        onSuccess: (res) => {
            const previousTodos = utils.todo.getTasks.getData()
            if(previousTodos){
                utils.todo.getTasks.setData(
                    previousTodos.map((task) => (task.id === res.id ? res : task))
                )
            }
            reset()
        }
    })

    const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
        onSuccess: (_, variables) => {
            const previousTodos = utils.todo.getTasks.getData()
            if(previousTodos){
                utils.todo.getTasks.setData(
                    previousTodos.filter((task) => task.id !== variables.taskId)
                )
            }
            reset()
        }
    })
    return {createTaskMutation, updateTaskMutation, deleteTaskMutation}
}
