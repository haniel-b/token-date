import React, { useState, useCallback, useRef, useMemo } from 'react';
import { format, formatISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useHistory } from 'react-router-dom';
import 'react-day-picker/lib/style.css';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import {
  Container,
  Content,
  UpdateContent,
  Calendar,
  EventUpdate,
} from './styles';

interface EventUpdateFormData {
  id: string;
  original_name: string;
  event_name: string;
  description: string;
  initial_date: Date;
  final_date: Date;
}

const UpdateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [
    isInitialDateCalendarVisible,
    setisInitialDateCalendarVisible,
  ] = useState(false);
  const [isFinalDateCalendarVisible, setIsFinalDateCalendarVisible] = useState(
    false,
  );

  const history = useHistory();

  const [selectedInitialDate, setInitialSelectedDate] = useState(new Date());
  const [selectedFinalDate, setFinalSelectedDate] = useState(new Date());

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: EventUpdateFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          original_name: Yup.string().required(
            'Nome original do evento obrigatório',
          ),
          event_name: Yup.string().required('Nome do evento obrigatório'),
          description: Yup.string().max(300, 'No máximo 300 caracteres'),
          initial_date: Yup.ref(formatISO(selectedInitialDate)),
          final_date: Yup.ref(formatISO(selectedFinalDate)),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const eventId = await api.get('/events/find', {
          params: {
            event_name: data.original_name,
          },
        });

        await api.put(`/events/${eventId.data}`, {
          description: data.description,
          event_name: data.event_name,
          initial_date: selectedInitialDate,
          final_date: selectedFinalDate,
        });

        addToast({
          type: 'success',
          title: 'Evento editado com sucesso!',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar evento',
          description:
            'Ocorreu um erro ao edit evento, ele não é seu ou as informações estão incorretas/insuficientes',
        });
      }
    },
    [addToast, selectedFinalDate, selectedInitialDate, history],
  );

  const handleVisibilityInitialDataCalendar = useCallback(() => {
    setisInitialDateCalendarVisible(false);
    setIsFinalDateCalendarVisible(true);
  }, []);

  const handleVisibilityFinalDataCalendar = useCallback(() => {
    setisInitialDateCalendarVisible(true);
    setIsFinalDateCalendarVisible(false);
  }, []);

  const handleInitialDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setInitialSelectedDate(day);
      }
    },
    [],
  );

  const handleFinalDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setFinalSelectedDate(day);
      }
    },
    [],
  );

  const formattedData = useMemo(() => {
    const formatted = format(selectedFinalDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });

    return formatted;
  }, [selectedFinalDate]);

  return (
    <Container>
      <Header />
      <Content>
        <UpdateContent>
          <h1>Editar</h1>

          <br />

          <EventUpdate>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="original_name"
                placeholder="Nome do evento a ser editado"
              />
              <Input name="event_name" placeholder="Nome do Evento" />
              <Input name="description" placeholder="Descrição do Evento" />
              <Input
                name="initial_date"
                placeholder="Data de Inicio"
                onClick={handleVisibilityFinalDataCalendar}
                onMouseEnter={() => setisInitialDateCalendarVisible(false)}
                value={format(selectedInitialDate, "'Dia' dd 'de' MMMM", {
                  locale: ptBR,
                })}
              />
              <Input
                name="final_date"
                placeholder="Data de Término"
                onClick={handleVisibilityInitialDataCalendar}
                onMouseEnter={() => setIsFinalDateCalendarVisible(false)}
                value={formattedData}
              />
              <Button
                onMouseEnter={() => setisInitialDateCalendarVisible(false)}
              >
                Enviar
              </Button>
            </Form>
          </EventUpdate>
        </UpdateContent>
        {isInitialDateCalendarVisible && (
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              onDayClick={handleInitialDateChange}
              selectedDays={selectedInitialDate}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        )}

        {isFinalDateCalendarVisible && (
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              onDayClick={handleFinalDateChange}
              selectedDays={selectedFinalDate}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        )}

        <Link to="/dashboard">Voltar</Link>
      </Content>
    </Container>
  );
};

export default UpdateEvent;
