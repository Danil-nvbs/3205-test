import { ShortenActions, ShortenForm } from './components/index';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Управление короткими ссылками</h1>
      <ShortenActions />
      <ShortenForm />
    </div>
  );
}