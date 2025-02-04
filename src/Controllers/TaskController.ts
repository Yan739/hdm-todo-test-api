import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from 'src/UseCase/SaveTask/SaveTaskUseCase';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
async create(@Body() dto: SaveTaskDto) {
  // Création d'une tâche 
  return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
}

@Patch('/tasks/:id')
async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
  // Mise à jour d'une tâche avec l'ID 
  return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto, Number(id));
}


  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
