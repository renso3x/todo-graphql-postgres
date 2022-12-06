import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Task } from '../entities/Task'

@Resolver()
export class TaskResolver {
    @Query(() => String)
    hello(): string {
        return 'Hello world'
    }

    @Query(() => [Task])
    getTasks(): Promise<Task[]>  {
        return Task.find({})
    }

    @Query(() => Task, { nullable: true })
    getTask(
        @Arg('id', () => Int)
        id: number 
    ): Promise<Task | null> {
        return Task.findOne({ where: { id } })
    }
    @Mutation(() => Task)
    createTask(
        @Arg('title', () => String)
        title: string
    ) {
       return Task.create({ title, isComplete: false }).save()
    }

    @Mutation(() => Boolean)
    async deleteTask(
        @Arg("id", () => Int)
        id: number
    ): Promise<boolean> {
        try {
            await Task.delete({ id })
            return true
        } catch (e) {
            return false
        }
    }

    @Mutation(() => Boolean, { nullable: true })
    async updateTask(
        @Arg("id", () => Int)
        id: number,

        @Arg("isComplete", () => Boolean)
        isComplete: boolean
    ): Promise<boolean | null> {
        const task = Task.findOne({ where: { id }})
        if (!task) {
            return null
        }
        try {
            await Task.update({ id }, { isComplete })
            return true
        } catch (e) {
            return false
        }
    }
}