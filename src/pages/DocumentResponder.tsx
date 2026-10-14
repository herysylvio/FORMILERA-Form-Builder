import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogoMark } from '../components/formilera/Logo';
import { DocumentCover } from '../components/document/DocumentCover';
import { FocusBlock } from '../components/document/FocusBlock';
import { UnderlineField } from '../components/document/UnderlineField';
import { CountrySelect } from '../components/document/CountrySelect';
import { TicketTiles } from '../components/document/TicketTiles';
import { DietaryPills } from '../components/document/DietaryPills';
import { ConsentCheck } from '../components/document/ConsentCheck';
import { ProgressPill } from '../components/document/ProgressPill';
import { SubmitBar } from '../components/document/SubmitBar';
import { RegistrationSuccess } from '../components/document/RegistrationSuccess';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { MOTIVATION_MAX } from '../data/registrationForm';
import { getCountry, isFieldFilled } from '../utils/registration';
import type { BlockId } from '../types/registration';

interface DocumentResponderProps {
  onExit: () => void;
}

export function DocumentResponder({ onExit }: DocumentResponderProps) {
  const f = useRegistrationForm();
  const { values, setValue, touch, errorFor } = f;
  const country = getCountry(values.countryCode);
  const success = f.status === 'success';

  const blockProps = (id: BlockId) => ({
    id,
    active: f.activeBlock === id,
    registerRef: f.registerBlock(id),
    onFocus: () => f.focusBlock(id)
  });

  return (
    <div className="relative min-h-screen w-full bg-[#0D1117] font-sans text-[#E6EDF3] antialiased selection:bg-indigo-500/30">
      {!success && <ProgressPill completed={f.completedCount} total={f.totalCount} />}

      <main className="mx-auto max-w-2xl px-6 py-16 pb-40">
        <AnimatePresence mode="wait">
          {success ?
          <RegistrationSuccess key="success" values={values} onEdit={f.editAgain} onExit={onExit} /> :

          <form key="form" noValidate onSubmit={(e) => {e.preventDefault();f.submit();}}>
              <DocumentCover />

              <div className="-mx-5 flex flex-col gap-3 sm:-mx-7">
                <FocusBlock {...blockProps('name')} number={1} title="Comment vous appelez-vous ?" required>
                  <UnderlineField
                  id="fullName"
                  label="Nom complet"
                  autoComplete="name"
                  placeholder="Prénom et nom"
                  value={values.fullName}
                  onChange={(v) => setValue('fullName', v)}
                  onBlur={() => touch('fullName')}
                  valid={isFieldFilled('fullName', values)}
                  error={errorFor('fullName')}
                  hint="Tel qu’il apparaîtra sur votre badge." />
                
                </FocusBlock>

                <FocusBlock {...blockProps('contact')} number={2} title="Comment vous joindre ?" description="Pour votre billet et les infos pratiques du jour J." required>
                  <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    <UnderlineField
                    id="email"
                    label="E-mail"
                    type="email"
                    autoComplete="email"
                    placeholder="nom@entreprise.com"
                    value={values.email}
                    onChange={(v) => setValue('email', v)}
                    onBlur={() => touch('email')}
                    valid={isFieldFilled('email', values)}
                    error={errorFor('email')} />
                  
                    <UnderlineField
                    id="phone"
                    label="Téléphone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={country.placeholder}
                    value={values.phone}
                    onChange={(v) => setValue('phone', v.replace(/[^\d\s]/g, ''))}
                    onBlur={() => touch('phone')}
                    valid={isFieldFilled('phone', values)}
                    error={errorFor('phone')}
                    leading={<CountrySelect value={values.countryCode} onChange={(code) => setValue('countryCode', code)} />} />
                  
                  </div>
                </FocusBlock>

                <FocusBlock {...blockProps('ticket')} number={3} title="Choisissez votre pass" description="Paiement sécurisé par Mobile Money après validation." required>
                  <TicketTiles value={values.ticket} onChange={(id) => setValue('ticket', id)} error={errorFor('ticket')} />
                </FocusBlock>

                <FocusBlock {...blockProps('dietary')} number={4} title="Préférences alimentaires" description="Sélectionnez tout ce qui s’applique." required={false}>
                  <DietaryPills value={values.dietary} onChange={(v) => setValue('dietary', v)} />
                </FocusBlock>

                {values.ticket === 'vip' && (
                  <FocusBlock {...blockProps('organisation')} number={5} title="Où travaillez-vous (Pass VIP) ?" required={false}>
                    <UnderlineField
                    id="organisation"
                    label="Organisation & poste"
                    autoComplete="organization"
                    placeholder="Ex. Product Lead chez TechMada"
                    value={values.organisation}
                    onChange={(v) => setValue('organisation', v)}
                    valid={isFieldFilled('organisation', values)} />
                  </FocusBlock>
                )}

                <FocusBlock {...blockProps('motivation')} number={6} title="Qu’attendez-vous du Sommet ?" description="Quelques mots suffisent — cela nous aide à composer les ateliers." required>
                  <UnderlineField
                  id="motivation"
                  label="Motivation"
                  multiline
                  maxLength={MOTIVATION_MAX}
                  placeholder="Rencontrer des investisseurs, découvrir l’IA appliquée…"
                  value={values.motivation}
                  onChange={(v) => setValue('motivation', v)}
                  onBlur={() => touch('motivation')}
                  error={errorFor('motivation')} />
                
                </FocusBlock>

                <FocusBlock {...blockProps('consent')} number={7} title="Confidentialité" required>
                  <ConsentCheck checked={values.consent} onChange={(v) => setValue('consent', v)} error={errorFor('consent')} />
                </FocusBlock>
              </div>

              <button
              type="button"
              onClick={onExit}
              className="mx-auto mt-16 flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-slate-600 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60">
              
                Propulsé par <LogoMark size="sm" /> <span className="font-bold tracking-[0.18em] text-slate-400">FORMILERA</span>
              </button>
            </form>
          }
        </AnimatePresence>
      </main>

      {!success &&
      <SubmitBar
        missingCount={f.missingRequired.length}
        completed={f.completedCount}
        total={f.totalCount}
        submitting={f.status === 'submitting'}
        onJumpToMissing={() => f.missingRequired[0] && f.scrollToBlock(f.missingRequired[0].block)}
        onSubmit={f.submit} />

      }
    </div>);

}