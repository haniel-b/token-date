import { getRepository } from 'typeorm';

import Event from '../models/Event';
import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  description: string;
  event_name: string;
  initial_date: Date;
  final_date: Date;
}

class DeleteEventService {
  public async execute({
    id,
    description,
    event_name,
    initial_date,
    final_date,
  }: RequestDTO): Promise<Event> {
    const eventsRepository = getRepository(Event);

    const event = await eventsRepository.findOne(id);

    if (!event) {
      throw new AppError('Evento não encontrado');
    }

    event.description = description;
    event.event_name = event_name;
    event.initial_date = initial_date;
    event.final_date = final_date;

    await eventsRepository.save(event);

    return event;
  }
}

export default DeleteEventService;
