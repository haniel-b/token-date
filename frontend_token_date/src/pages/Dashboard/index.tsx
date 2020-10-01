import React, { useState, useCallback, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import 'react-day-picker/lib/style.css';
import { FiClock, FiX } from 'react-icons/fi';

import Header from '../../components/Header';

import api from '../../services/api';

import { Container, Content, Events, NextEvents } from './styles';

interface AllDaysProps {
  id: string;
  user_id: string;
  event_name: string;
  initial_date: string;
  final_date: string;
  description: string;

  formattedInitialDates: string;
  formattedFinalDates: string;
}

const Dashboard: React.FC = () => {
  const [events, setAllEvents] = useState<AllDaysProps[]>([]);

  useEffect(() => {
    api.get<AllDaysProps[]>('/events').then(response => {
      const formattedDates = response.data.map(event => {
        return {
          ...event,
          formattedInitialDates: format(
            parseISO(event.initial_date),
            'dd / MMM / yyyy',
          ),
          formattedFinalDates: format(
            parseISO(event.final_date),
            'dd / MMM / yyyy',
          ),
        };
      });

      setAllEvents(formattedDates);
    });
  }, [events]);

  const handleDelete = useCallback(async id => {
    await api.delete(`/events/${id}`);
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <Events>
          <h1>Eventos</h1>

          <br />
          <strong>Eventos a seguir</strong>

          {events.map(date => (
            <NextEvents key={date.id}>
              <div>
                <div>
                  <strong>{date.event_name}</strong>
                  <button onClick={() => handleDelete(date.id)} type="button">
                    <FiX />
                  </button>
                </div>

                <span>{date.description}</span>

                <span>
                  <FiClock />
                  Início
                  <h5>{date.formattedInitialDates}</h5>
                </span>
                <span>
                  <FiClock />
                  Encerramento
                  <h5>{date.formattedFinalDates}</h5>
                </span>
              </div>
            </NextEvents>
          ))}
        </Events>
      </Content>
    </Container>
  );
};

export default Dashboard;
