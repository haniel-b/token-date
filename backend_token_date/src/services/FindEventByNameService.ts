import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Event from '../models/Event';

interface RequestDTO {
  event_name: string;
}

class FindEventByNameService {
  public async execute({ event_name }: RequestDTO): Promise<string> {
    const eventsRepository = getRepository(Event);

    const checkIsEventNameAvaiable = await eventsRepository.findOne({
      where: { event_name },
    });

    if (!checkIsEventNameAvaiable) {
      throw new AppError('Evento não encontrado');
    }
    return checkIsEventNameAvaiable.id;
  }
}

export default FindEventByNameService;
