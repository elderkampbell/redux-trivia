import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('Testa se os campos de nome, email e o botão play estão na tela.', () => {
  renderWithRouterAndRedux(<App />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: /email:/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: /nome:/i})).toBeInTheDocument();
  expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
  expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  expect(screen.getByRole('button', {  name: /config/i})).toBeInTheDocument();
});

test('Testa se os campos de nome, email e o botão play estão na tela.', () => {
  renderWithRouterAndRedux(<App />);
  userEvent.click(screen.getByRole('button', {  name: /config/i}));
  expect(screen.getByRole('heading', { name: /config/i })).toBeInTheDocument();
});

test('Testa se ao preencher os campos com informações validas e clicar no botão play ele redireciona.', () => {
  renderWithRouterAndRedux(<App />);
  userEvent.type(screen.getByTestId('input-gravatar-email'), 'harry@just.harry');
  userEvent.type(screen.getByTestId('input-player-name'), 'JustHarry');
  userEvent.click(screen.getByRole('button', { name: /play/i }));
  expect(screen.getByText(/play/i)).toBeInTheDocument();
});