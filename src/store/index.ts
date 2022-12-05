import create from "zustand";
import { UpdateTaskInput} from "../schema/todo"

type State = {
    editedTask: UpdateTaskInput
    updateEditedTask: (payload: UpdateTaskInput) => void
    resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
    editedTask: {taskId: "", priority: 0, title: "", body: ""},
    updateEditedTask: (payload) => {
        set({
            editedTask: payload,
        })
    },
    resetEditedTask: () => {
        set({
            editedTask: {taskId: "", priority: 0, title: "", body: ""},
        })
    }
}))

export default useStore