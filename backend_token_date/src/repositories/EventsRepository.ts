import { EntityRepository, Repository } from 'typeorm';

import Event from '../models/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  private events: Event[] = [];

  public async findByDate(date: Date): Promise<Event | null> {
    const findEvent = await this.findOne({
      where: { initial_date: date },
    });

    return findEvent || null;
  }
}

export default EventsRepository;
