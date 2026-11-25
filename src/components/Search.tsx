import { useId, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
type Item = { slug: string; name: string; description: string };
export default function Search({ tools }: { tools: readonly Item[] }) {
  const [query, setQuery] = useState('');
  const id = useId();
  const normalized = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matches = query.trim() ? tools.filter(t => normalized(`${t.name} ${t.description}`).includes(normalized(query.trim()))) : [];
  return <div className="search-wrap"><label className="sr-only" htmlFor={id}>Buscar calculadoras</label><div className="search-field"><SearchIcon size={21} aria-hidden="true"/><input id={id} type="search" placeholder="¿Qué quieres calcular?" value={query} onChange={e => setQuery(e.target.value)} autoComplete="off"/><span className="search-label">Buscar</span></div>{query.trim() && <div className="search-results" aria-live="polite">{matches.length ? matches.map(t => <a href={`/herramientas/${t.slug}/`} key={t.slug}><strong>{t.name}</strong><span>{t.description}</span></a>) : <p>No hemos encontrado herramientas para «{query}».</p>}</div>}</div>;
}
