import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Event from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';

interface RequestDTO {
  user_id: string;
  description: string;
  event_name: string;
  initial_date: Date;
  final_date: Date;
}

class CreateEventService {
  public async execute({
    description,
    user_id,
    event_name,
    initial_date,
    final_date,
  }: RequestDTO): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);

    const eventDate = startOfDay(initial_date);

    const findEventInTheSameDate = await eventsRepository.findByDate(eventDate);

    if (findEventInTheSameDate) {
      throw new AppError('Esta data já foi reservada!');
    }

    const event = eventsRepository.create({
      user_id,
      description,
      event_name,
      initial_date: eventDate,
      final_date,
    });

    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;
