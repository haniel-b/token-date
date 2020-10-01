import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Event from '../models/Event';

interface RequestDTO {
  id: string;
}

class DeleteEventService {
  public execute({ id }: RequestDTO): any {
    const eventsRepository = getRepository(Event);

    const eventIndex = eventsRepository.findOne(id);

    if (!eventIndex) {
      throw new AppError('Evento não encontrado');
    }

    eventsRepository.delete(id);
  }
}

export default DeleteEventService;
