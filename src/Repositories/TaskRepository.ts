import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    if (!('id' in data) || !data.id) {
      // création 
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput, 
      });
    }

    // update
    return this.prisma.task.update({
      where: { id: data.id as number }, 
      data: data as Prisma.TaskUpdateInput,
    });
  }
}

