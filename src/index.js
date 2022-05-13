import React from 'react';
import { createRoot } from 'react-dom/client';
import { HeroesApp } from './HeroesApp';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <HeroesApp />
);
