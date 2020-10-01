import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import EventsRepository from '../repositories/EventsRepository';
import CreateEventsService from '../services/CreateEventService';
import DeleteEventService from '../services/DeleteEventService';
import UpdateEventService from '../services/UpdateEventService';
import FindEventByNameService from '../services/FindEventByNameService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const eventsRouter = Router();

eventsRouter.use(ensureAuthenticated);

eventsRouter.get('/', async (request, response) => {
  const eventsRepository = getCustomRepository(EventsRepository);
  const events = await eventsRepository.find();

  return response.json(events);
});

eventsRouter.get('/find', async (request, response) => {
  const { event_name } = request.query;

  const findEvent = new FindEventByNameService();

  const eventId = await findEvent.execute({ event_name: String(event_name) });

  return response.json(eventId);
});

eventsRouter.post('/', async (request, response) => {
  const {
    user_id,
    event_name,
    description,
    initial_date,
    final_date,
  } = request.body;

  const parsedInitialDate = parseISO(initial_date);
  const parsedFinalDate = parseISO(final_date);

  const createEvent = new CreateEventsService();

  const event = await createEvent.execute({
    description,
    user_id,
    event_name,
    initial_date: parsedInitialDate,
    final_date: parsedFinalDate,
  });

  return response.json(event);
});

eventsRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  const deleteEvent = new DeleteEventService();

  deleteEvent.execute({ id });

  return response.status(204).send();
});

eventsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    original_name,
    description,
    event_name,
    initial_date,
    final_date,
  } = request.body;

  const updateEvent = new UpdateEventService();

  const updatedEvent = await updateEvent.execute({
    id,
    original_name,
    description,
    event_name,
    initial_date,
    final_date,
  });

  return response.json(updatedEvent);
});

export default eventsRouter;
