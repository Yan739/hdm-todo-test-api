import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto, id?: number) {
    if (id) {
      // Si un ID est passé, on fait une mise à jour
      return this.taskRepository.save({
        id, 
        name: dto.name, 
      });
    }
    
    // Si aucun ID, on crée une nouvelle tâche
    return this.taskRepository.save({
      name: dto.name, 
    });
  }
}
