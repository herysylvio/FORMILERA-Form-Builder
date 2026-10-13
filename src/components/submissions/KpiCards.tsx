import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Inbox, Radio, TrendingUp, Zap } from 'lucide-react';
import { dashboardKpis, responseTrend } from '../../data/submissions';
import { springSoft } from '../../utils/motion';

const card =
'relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md';

function CardLabel({ icon: Icon, children }: {icon: typeof Inbox;children: React.ReactNode;}) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {children}
    </p>);

}

function Sparkline({ data }: {data: number[];}) {
  const w = 112;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [i / (data.length - 1) * w, h - 3 - (v - min) / (max - min) * (h - 6)]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="overflow-visible">
      <path d={`${line} L${w},${h} L0,${h} Z`} className="fill-emerald-400/10" />
      <motion.path d={line} fill="none" stroke="#34D399" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <circle cx={lx} cy={ly} r={2.5} fill="#34D399" className="drop-shadow-[0_0_4px_rgba(52,211,153,0.9)]" />
    </svg>);

}

function Ring({ value }: {value: number;}) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" className="-rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="#818CF8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(129,140,248,0.75))' }} />
      
    </svg>);

}

export function KpiCards() {
  const k = dashboardKpis;
  const items = [
  <div key="total" className={card}>
      <CardLabel icon={Inbox}>Total Réponses</CardLabel>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[28px] font-semibold leading-none tracking-tight tabular-nums text-white">{k.totalResponses}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-300">
            <TrendingUp className="h-3 w-3" aria-hidden="true" /> {k.totalDelta} <span className="text-slate-500">vs semaine passée</span>
          </p>
        </div>
        <Sparkline data={responseTrend} />
      </div>
    </div>,
  <div key="completion" className={card}>
      <CardLabel icon={CheckCircle2}>Taux de Complétion</CardLabel>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[28px] font-semibold leading-none tracking-tight tabular-nums text-white">{k.completionRate}%</p>
          <p className="mt-2 text-xs text-slate-500">1 007 réponses complètes</p>
        </div>
        <Ring value={k.completionRate} />
      </div>
    </div>,
  <div key="time" className={card}>
      <CardLabel icon={Clock}>Temps Moyen</CardLabel>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[28px] font-semibold leading-none tracking-tight tabular-nums text-white">{k.averageTime}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-200">
            <Zap className="h-3 w-3" aria-hidden="true" /> Ultra rapide
          </span>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-slate-300">
          <Clock className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </div>,
  <div key="last" className={card}>
      <CardLabel icon={Radio}>Dernière Soumission</CardLabel>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xl font-semibold leading-tight tracking-tight text-white">{k.lastSubmission}</p>
          <p className="mt-2 text-xs text-slate-500">Aminata Diallo · #SUB-849</p>
        </div>
        <span className="relative flex h-12 w-12 items-center justify-center" aria-label="En direct">
          <span className="absolute h-12 w-12 animate-ping rounded-full bg-emerald-400/20 [animation-duration:2s]" />
          <span className="absolute h-8 w-8 rounded-full bg-emerald-400/15" />
          <span className="relative h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_3px_rgba(52,211,153,0.7)]" />
        </span>
      </div>
    </div>];


  return (
    <section aria-label="Indicateurs clés" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) =>
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springSoft, delay: i * 0.05 }}>
          {item}
        </motion.div>
      )}
    </section>);

}