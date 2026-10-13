import React, { useEffect, useState } from 'react';
import { Landing } from './pages/Landing';
import { Builder } from './pages/Builder';
import { Responder } from './pages/Responder';
import { DocumentResponder } from './pages/DocumentResponder';
import { Submissions } from './pages/Submissions';

type Screen = 'landing' | 'submissions' | 'documentResponder' | 'cardResponder' | 'builder';

interface AppProps {
  screen?: 'landing' | 'submissions' | 'documentResponder' | 'cardResponder' | 'builder';
  defaultTheme?: 'dark' | 'light';
  defaultMode?: 'document' | 'card';
  slashMenuOpen?: boolean;
}

export function App({ screen = 'landing', defaultTheme = 'dark', defaultMode = 'document', slashMenuOpen = true }: AppProps) {
  const [current, setCurrent] = useState<Screen>(screen);

  useEffect(() => setCurrent(screen), [screen]);
  useEffect(() => window.scrollTo(0, 0), [current]);

  const toBuilder = () => setCurrent('builder');

  if (current === 'landing') return <Landing onStart={toBuilder} onDemo={() => setCurrent('cardResponder')} />;
  if (current === 'submissions') return <Submissions onOpenEditor={toBuilder} />;
  if (current === 'documentResponder') return <DocumentResponder onExit={toBuilder} />;
  if (current === 'cardResponder') return <Responder onExit={toBuilder} />;
  return (
    <Builder
      defaultTheme={defaultTheme}
      defaultMode={defaultMode}
      slashMenuOpen={slashMenuOpen}
      onPreview={(mode) => setCurrent(mode === 'card' ? 'cardResponder' : 'documentResponder')}
      onOpenSubmissions={() => setCurrent('submissions')} />);


}