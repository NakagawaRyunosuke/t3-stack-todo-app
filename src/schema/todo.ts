import z, { string } from "zod"

export const createTaskSchema = z.object({
    title: string().max(20),
    body: string().min(5),
})
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>

export const updateTaskSchema = z.object({
    taskId: z.string().cuid(),
    title: string().max(20),
    body: string().min(5),
})
export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>

export const getSingleTaskSchema = z.object({
    taskId: z.string().cuid(),
})

export const deleteTaskSchema = z.object({
    taskId: z.string().cuid(),
})