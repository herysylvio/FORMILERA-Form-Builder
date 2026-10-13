import React from 'react';
import { BentoCard } from './BentoCard';
import { SectionHeading } from './SectionHeading';
import { PromptToFormVisual } from './bento/PromptToFormVisual';
import { ResponseModesVisual } from './bento/ResponseModesVisual';
import { MadagascarVisual } from './bento/MadagascarVisual';
import { AnalyticsVisual } from './bento/AnalyticsVisual';

function CardTitle({ emoji, title, text }: {emoji: string;title: string;text: string;}) {
  return (
    <>
      <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
        <span aria-hidden="true">{emoji}</span> {title}
      </h3>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">{text}</p>
    </>);

}

export function BentoFeatures() {
  return (
    <section id="fonctionnalites" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Pourquoi FORMILERA ?"
        title="Tout ce qu’il faut pour des formulaires qu’on a envie de remplir."
        description="De l’idée au premier répondant en moins d’une minute — puis des données propres, prêtes à exploiter." />
      
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <BentoCard className="md:col-span-2">
          <CardTitle emoji="🤖" title="Génération Prompt-to-Form en 5s" text="Décrivez votre besoin en une phrase. L’IA compose un formulaire complet, avec les bons types de champs, la logique et le ton adaptés." />
          <PromptToFormVisual />
        </BentoCard>
        <BentoCard delay={0.05}>
          <CardTitle emoji="🗂️" title="Double Mode de Réponse" text="Défilement document fluide ou expérience carte par carte cinématique — un seul formulaire, deux façons de répondre." />
          <ResponseModesVisual />
        </BentoCard>
        <BentoCard delay={0.05}>
          <CardTitle emoji="🇲🇬" title="Optimisé pour Madagascar" text="Ultra-léger : moins d’une seconde en 3G/4G. Prêt pour les paiements Mobile Money locaux." />
          <MadagascarVisual />
        </BentoCard>
        <BentoCard className="md:col-span-2" delay={0.1}>
          <CardTitle emoji="📊" title="Analytics & Export Instantané" text="Un tableau façon Linear, des compteurs en temps réel et l’export CSV / JSON en un clic." />
          <AnalyticsVisual />
        </BentoCard>
      </div>
    </section>);

}