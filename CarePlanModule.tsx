'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Droplets,
  Heart,
  Home,
  Leaf,
  MoreHorizontal,
  Pill,
  ShieldAlert,
  Sparkles,
  Utensils,
  UsersRound,
} from 'lucide-react'

type CareTab = 'medications' | 'meals' | 'water'
type CheckInStatus = 'Upcoming' | 'Confirmed'

type Medication = {
  name: string
  note: string
  dosage: string
  time: string
  status: 'Taken' | 'Pending' | 'Missed'
}

const medications: Medication[] = [
  { name: 'Vitamin D3', note: 'With breakfast', dosage: '1 softgel · 1,000 IU', time: '8:00 AM', status: 'Taken' },
  { name: 'Amlodipine', note: 'Blood pressure', dosage: '1 tablet · 5 mg', time: '8:30 AM', status: 'Missed' },
  { name: 'Lisinopril', note: 'Take with water', dosage: '1 tablet · 10 mg', time: '12:00 PM', status: 'Pending' },
  { name: 'Calcium + D', note: 'With lunch', dosage: '1 tablet · 600 mg', time: '1:00 PM', status: 'Pending' },
]

const mealPlan = [
  { time: '8:00 AM', meal: 'Breakfast', detail: 'Oatmeal with blueberries · scrambled egg', tag: 'Completed' },
  { time: '12:30 PM', meal: 'Lunch', detail: 'Roasted chicken · soft vegetables · brown rice', tag: 'Coming up' },
  { time: '3:00 PM', meal: 'Snack', detail: 'Greek yogurt with sliced banana', tag: 'Planned' },
  { time: '6:00 PM', meal: 'Dinner', detail: 'Baked salmon · mashed sweet potato', tag: 'Planned' },
]

const initialCheckIns = [
  { id: 'morning', title: 'Morning check-in', time: '9:00 AM', status: 'Upcoming' as CheckInStatus, note: 'A quick hello to start the day' },
  { id: 'afternoon', title: 'Afternoon check-in', time: '2:00 PM', status: 'Upcoming' as CheckInStatus, note: 'How are you feeling?' },
  { id: 'evening', title: 'Evening check-in', time: '7:00 PM', status: 'Upcoming' as CheckInStatus, note: 'Wind down and review the day' },
]

const recentCheckIns = [
  { day: 'Yesterday', title: 'Evening check-in', time: '7:04 PM', result: 'All well' },
  { day: 'Yesterday', title: 'Afternoon check-in', time: '2:12 PM', result: 'All well' },
  { day: 'Oct 29', title: 'Morning check-in', time: '9:02 AM', result: 'All well' },
]

function StatusPill({ status }: { status: Medication['status'] }) {
  const styles = {
    Taken: 'bg-emerald-50 text-emerald-800 ring-emerald-700/15',
    Pending: 'bg-amber-50 text-amber-900 ring-amber-700/15',
    Missed: 'bg-rose-50 text-rose-800 ring-rose-700/15',
  }
  const dotStyles = {
    Taken: 'bg-emerald-600',
    Pending: 'bg-amber-600',
    Missed: 'bg-rose-600',
  }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#e7e9e3] bg-[#fbfcf9] px-5 py-6 lg:flex" aria-label="Main navigation">
      <a href="#overview" className="mb-10 flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-[#dcefe5] text-[#1e684f]"><Heart className="size-5" strokeWidth={2.4} /></span>
        <span className="leading-tight"><span className="block text-[17px] font-bold tracking-tight text-[#193b31]">ElderLife <span className="text-[#3d8167]">AI</span></span><span className="mt-1 block text-[11px] font-medium tracking-wide text-[#77837c]">CARE, MADE CLOSER</span></span>
      </a>

      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#89938d]">Workspace</p>
      <nav className="flex flex-col gap-1" aria-label="Care plan sections">
        <a href="#overview" className="flex items-center gap-3 rounded-xl bg-[#e9f3ed] px-3 py-2.5 text-sm font-semibold text-[#215c46]"><Home className="size-[18px]" aria-hidden="true" />Overview</a>
        <a href="#care-plan" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#65716a] transition hover:bg-[#f0f3ef] hover:text-[#24382f]"><Pill className="size-[18px]" aria-hidden="true" />Care plan<span className="ml-auto rounded-full bg-[#fbe8df] px-2 py-0.5 text-[10px] font-bold text-[#a74d32]">1</span></a>
        <a href="#check-ins" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#65716a] transition hover:bg-[#f0f3ef] hover:text-[#24382f]"><CalendarDays className="size-[18px]" aria-hidden="true" />Check-ins</a>
        <a href="#alerts" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#65716a] transition hover:bg-[#f0f3ef] hover:text-[#24382f]"><Bell className="size-[18px]" aria-hidden="true" />Alerts<span className="ml-auto size-2 rounded-full bg-[#c85048]" aria-label="1 active alert" /></a>
      </nav>

      <div className="mt-auto rounded-2xl border border-[#e7ece5] bg-white p-4">
        <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-[#f1f6ef] text-[#598266]"><UsersRound className="size-[18px]" aria-hidden="true" /></div>
        <p className="text-sm font-semibold text-[#2d3b33]">Care team</p>
        <p className="mt-1 text-xs leading-relaxed text-[#77837c]">You&apos;re not doing this alone. Keep everyone in the loop.</p>
        <a href="#profile" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#39745a] hover:text-[#20543e]">View care team <ChevronRight className="size-3.5" aria-hidden="true" /></a>
      </div>
    </aside>
  )
}

function ProfileCard() {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="rounded-2xl border border-[#e6e9e3] bg-white p-5 shadow-[0_2px_12px_rgba(27,50,39,0.035)] sm:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#819087]">Patient profile</p><h2 id="profile-heading" className="mt-1 text-lg font-bold tracking-tight text-[#243b30]">Care at a glance</h2></div>
        <button type="button" aria-label="More profile options" className="flex size-9 items-center justify-center rounded-lg text-[#77837c] transition hover:bg-[#f3f5f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"><MoreHorizontal className="size-5" /></button>
      </div>
      <div className="flex items-center gap-4 border-b border-[#edf0eb] pb-5">
        <div aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8f0e9] text-lg font-bold text-[#36654f]">EM</div>
        <div className="min-w-0"><p className="truncate text-base font-bold text-[#243b30]">Eleanor Mitchell</p><p className="mt-1 text-sm text-[#6c7971]">Age 78 <span className="px-1.5 text-[#c4cbc4]">•</span> Patient since 2022</p></div>
      </div>
      <dl className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2">
        <div><dt className="text-xs font-medium text-[#7a867e]">Primary caregiver</dt><dd className="mt-1 text-sm font-semibold text-[#34483c]">Alice Mitchell</dd><p className="mt-0.5 text-xs text-[#7a867e]">Daughter</p></div>
        <div><dt className="text-xs font-medium text-[#7a867e]">Emergency contact</dt><dd className="mt-1 text-sm font-semibold text-[#34483c]">James Mitchell</dd><a className="mt-0.5 inline-block text-xs text-[#39745a] underline-offset-2 hover:underline" href="tel:+14155550142">(415) 555-0142</a></div>
      </dl>
    </section>
  )
}

function PlanContent({ tab }: { tab: CareTab }) {
  if (tab === 'meals') {
    return <div className="divide-y divide-[#edf0eb]" role="region" aria-label="Daily meal schedule">
      {mealPlan.map((item) => <div key={item.meal} className="grid grid-cols-[76px_1fr] gap-3 py-4 first:pt-2 last:pb-1 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:gap-4"><time className="pt-0.5 text-xs font-semibold text-[#65766b]">{item.time}</time><div><p className="text-sm font-semibold text-[#2e4135]">{item.meal}</p><p className="mt-1 text-xs leading-relaxed text-[#79847d]">{item.detail}</p></div><span className={`col-start-2 mt-1 text-[11px] font-semibold sm:col-auto sm:mt-0 ${item.tag === 'Completed' ? 'text-emerald-700' : 'text-[#7d887f]'}`}>{item.tag}</span></div>)}
    </div>
  }

  if (tab === 'water') {
    return <div role="region" aria-label="Daily water intake" className="py-2">
      <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-[#2e4135]">Today&apos;s hydration goal</p><p className="mt-1 text-xs text-[#79847d]">A gentle reminder to sip throughout the day</p></div><span className="rounded-full bg-[#e9f3f7] px-3 py-1.5 text-sm font-bold text-[#286580]">5 / 8 cups</span></div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#edf2f2]" role="progressbar" aria-label="Water intake" aria-valuemin={0} aria-valuemax={8} aria-valuenow={5}><div className="h-full w-[62.5%] rounded-full bg-[#5b9db3]" /></div>
      <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Five of eight cups logged">
        {Array.from({ length: 8 }, (_, index) => <div key={index} className={`flex aspect-square items-center justify-center rounded-xl border ${index < 5 ? 'border-[#d4e9ee] bg-[#edf7f8] text-[#347b91]' : 'border-dashed border-[#dce3e0] bg-[#fafbf9] text-[#aab5af]'}`}><Droplets className="size-4" aria-hidden="true" /><span className="sr-only">Cup {index + 1}: {index < 5 ? 'logged' : 'not logged'}</span></div>)}
      </div>
      <p className="mt-4 text-xs text-[#79847d]">Last glass recorded at <span className="font-semibold text-[#53635a]">10:15 AM</span></p>
    </div>
  }

  return <div className="overflow-x-auto">
    <table className="w-full min-w-[570px] border-separate border-spacing-0 text-left">
      <caption className="sr-only">Medication schedule and status for today</caption>
      <thead><tr className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#87928b]"><th scope="col" className="border-b border-[#edf0eb] pb-3 pr-4">Medication</th><th scope="col" className="border-b border-[#edf0eb] px-3 pb-3">Dosage</th><th scope="col" className="border-b border-[#edf0eb] px-3 pb-3">Scheduled</th><th scope="col" className="border-b border-[#edf0eb] pl-3 pb-3">Status</th></tr></thead>
      <tbody>{medications.map((medication) => <tr key={medication.name} className="group">
        <th scope="row" className="border-b border-[#f0f2ee] py-4 pr-4 font-normal"><span className="block text-sm font-semibold text-[#304239]">{medication.name}</span><span className="mt-1 block text-xs text-[#839087]">{medication.note}</span></th>
        <td className="border-b border-[#f0f2ee] px-3 py-4 text-xs font-medium text-[#64736a]">{medication.dosage}</td>
        <td className="border-b border-[#f0f2ee] px-3 py-4 text-xs font-semibold text-[#4c5c52]">{medication.time}</td>
        <td className="border-b border-[#f0f2ee] py-4 pl-3"><StatusPill status={medication.status} /></td>
      </tr>)}</tbody>
    </table>
  </div>
}

function CarePlanCard() {
  const [tab, setTab] = useState<CareTab>('medications')
  const tabs: { id: CareTab; label: string; icon: typeof Pill }[] = [
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'meals', label: 'Daily meals', icon: Utensils },
    { id: 'water', label: 'Water intake', icon: Droplets },
  ]

  return (
    <section id="care-plan" aria-labelledby="care-plan-heading" className="rounded-2xl border border-[#e6e9e3] bg-white p-5 shadow-[0_2px_12px_rgba(27,50,39,0.035)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-lg bg-[#e9f2e9] text-[#4c795b]"><Leaf className="size-4" /></span><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#819087]">Today&apos;s routine</p></div><h2 id="care-plan-heading" className="mt-2 text-lg font-bold tracking-tight text-[#243b30]">Care plan schedule</h2><p className="mt-1 text-xs text-[#7b877f]">Saturday, October 31 <span aria-hidden="true">·</span> Updated just now</p></div>
        <button type="button" className="rounded-lg px-3 py-2 text-xs font-semibold text-[#39745a] transition hover:bg-[#eff5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">View full plan <span aria-hidden="true">→</span></button>
      </div>
      <div className="mt-5 flex gap-1 overflow-x-auto rounded-xl bg-[#f5f7f3] p-1" role="group" aria-label="Choose care plan section">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className={`flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 sm:gap-2 sm:px-4 sm:text-xs ${tab === id ? 'bg-white text-[#285943] shadow-sm' : 'text-[#748078] hover:text-[#33483b]'}`}><Icon className="size-3.5" aria-hidden="true" />{label}</button>)}
      </div>
      <div className="mt-4 min-h-[275px]">{tab === 'medications' ? <PlanContent tab={tab} /> : <PlanContent tab={tab} />}</div>
    </section>
  )
}

function CheckInCard({ onCheckInConfirmed }: { onCheckInConfirmed: () => void }) {
  const [checkIns, setCheckIns] = useState(initialCheckIns)
  const [confirmedCheckIns, setConfirmedCheckIns] = useState<string[]>([])

  function confirmCheckIn(id: string) {
    if (confirmedCheckIns.includes(id)) return
    const checkedAt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date())
    setCheckIns((current) => current.map((checkIn) => checkIn.id === id ? { ...checkIn, status: 'Confirmed' } : checkIn))
    setConfirmedCheckIns((current) => [id, ...current])
    onCheckInConfirmed()
    const newEntry = { day: 'Today', title: checkIns.find((checkIn) => checkIn.id === id)?.title ?? 'Check-in', time: checkedAt, result: 'All well' }
    setTodayLog((current) => [newEntry, ...current])
  }

  const [todayLog, setTodayLog] = useState<{ day: string; title: string; time: string; result: string }[]>([])
  const confirmedCount = checkIns.filter((item) => item.status === 'Confirmed').length

  return (
    <section id="check-ins" aria-labelledby="check-in-heading" className="rounded-2xl border border-[#e6e9e3] bg-white p-5 shadow-[0_2px_12px_rgba(27,50,39,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-lg bg-[#eef0fa] text-[#6c6da0]"><Clock3 className="size-4" /></span><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#819087]">Stay connected</p></div><h2 id="check-in-heading" className="mt-2 text-lg font-bold tracking-tight text-[#243b30]">Daily check-ins</h2><p className="mt-1 text-xs text-[#7b877f]">{confirmedCount} of {checkIns.length} check-ins confirmed today</p></div><span className="rounded-full bg-[#f4f5fa] px-2.5 py-1 text-[11px] font-semibold text-[#65668d]">Today</span></div>
      <ul className="mt-5 flex flex-col gap-3">
        {checkIns.map((checkIn) => <li key={checkIn.id} className={`rounded-xl border p-3.5 transition ${checkIn.status === 'Confirmed' ? 'border-[#dcebe0] bg-[#f5faf6]' : 'border-[#edf0eb] bg-white'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${checkIn.status === 'Confirmed' ? 'bg-[#e1f0e5] text-[#38805a]' : 'bg-[#f2f4ef] text-[#738078]'}`}>{checkIn.status === 'Confirmed' ? <Check className="size-4" aria-hidden="true" /> : <Clock3 className="size-4" aria-hidden="true" />}</span><div><p className="text-sm font-semibold text-[#34473c]">{checkIn.title}</p><p className="mt-0.5 text-xs text-[#7a867e]">{checkIn.time} <span aria-hidden="true">·</span> {checkIn.note}</p></div></div>
            <button type="button" disabled={checkIn.status === 'Confirmed'} onClick={() => confirmCheckIn(checkIn.id)} className={`min-h-10 rounded-lg px-3.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-default ${checkIn.status === 'Confirmed' ? 'bg-[#e5f1e8] text-[#397252]' : 'bg-[#28674f] text-white hover:bg-[#20563f]'}`} aria-label={`${checkIn.status === 'Confirmed' ? 'Confirmed' : 'Confirm'} ${checkIn.title}`}>
              {checkIn.status === 'Confirmed' ? <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5" aria-hidden="true" />Confirmed</span> : "I'm OK / Confirm"}
            </button>
          </div>
        </li>)}
      </ul>
      <div className="mt-6 border-t border-[#edf0eb] pt-5">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold text-[#34473c]">Recent check-ins</h3><span className="text-[11px] font-medium text-[#88938c]">Last 24 hours</span></div>
        <ol className="flex flex-col gap-3" aria-live="polite" aria-label="Check-in history">
          {todayLog.map((entry, index) => <li key={`${entry.title}-${entry.time}-${index}`} className="flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-full bg-[#e7f2e9] text-[#34744f]"><Check className="size-3.5" aria-hidden="true" /></span><div className="flex min-w-0 flex-1 items-center justify-between gap-2"><p className="truncate text-xs font-medium text-[#4d5b52]">{entry.title}<span className="font-normal text-[#89948d]"> · {entry.result}</span></p><p className="shrink-0 text-[11px] text-[#8a948d]">{entry.day}, {entry.time}</p></div></li>)}
          {recentCheckIns.map((entry) => <li key={`${entry.day}-${entry.title}`} className="flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-full bg-[#f0f4ef] text-[#64806c]"><Check className="size-3.5" aria-hidden="true" /></span><div className="flex min-w-0 flex-1 items-center justify-between gap-2"><p className="truncate text-xs font-medium text-[#4d5b52]">{entry.title}<span className="font-normal text-[#89948d]"> · {entry.result}</span></p><p className="shrink-0 text-[11px] text-[#8a948d]">{entry.day}, {entry.time}</p></div></li>)}
        </ol>
      </div>
    </section>
  )
}

function AlertsCard({ morningConfirmed }: { morningConfirmed: boolean }) {
  const alertCount = morningConfirmed ? 1 : 2

  return (
    <section id="alerts" aria-labelledby="alerts-heading" className="overflow-hidden rounded-2xl border border-[#f1d7d3] bg-[#fff9f7] shadow-[0_2px_12px_rgba(94,40,33,0.035)]">
      <div className="flex items-start gap-3 border-b border-[#f4e3df] px-5 py-4 sm:px-6"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fce7e3] text-[#aa4941]"><ShieldAlert className="size-4" /></span><div><div className="flex items-center gap-2"><h2 id="alerts-heading" className="text-sm font-bold text-[#753a35]">Needs your attention</h2><span className="rounded-full bg-[#f9e1dd] px-2 py-0.5 text-[10px] font-bold text-[#9d423b]">{alertCount} {alertCount === 1 ? 'alert' : 'alerts'}</span></div><p className="mt-1 text-xs text-[#91645e]">{alertCount === 1 ? 'One item may need follow-up.' : 'A couple of things may need follow-up.'}</p></div></div>
      <ul className="divide-y divide-[#f4e3df] px-5 sm:px-6">
        {!morningConfirmed && <li className="flex gap-3 py-4"><span className="mt-0.5 text-[#bb524a]"><AlertTriangle className="size-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-[#633e39]">Morning check-in overdue</p><p className="mt-1 text-xs leading-relaxed text-[#8b625c]">No response recorded for the 9:00 AM check-in.</p><a href="#check-ins" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#a74840] hover:underline">Review check-in <ChevronRight className="size-3" aria-hidden="true" /></a></div></li>}
        <li className="flex gap-3 py-4"><span className="mt-0.5 text-[#bb524a]"><Pill className="size-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-[#633e39]">Amlodipine dose missed</p><p className="mt-1 text-xs leading-relaxed text-[#8b625c]">Scheduled for 8:30 AM. Check with Eleanor before taking any next steps.</p><a href="#care-plan" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#a74840] hover:underline">View medication plan <ChevronRight className="size-3" aria-hidden="true" /></a></div></li>
      </ul>
      <p className="px-5 pb-4 text-[10px] leading-relaxed text-[#99746f] sm:px-6">If this is an emergency, call your local emergency number.</p>
    </section>
  )
}

function SummaryCard({ label, value, caption, icon: Icon, tone, trend }: { label: string; value: string; caption: string; icon: typeof Pill; tone: string; trend?: 'up' | 'down' }) {
  return <article className="flex items-start justify-between rounded-2xl border border-[#e7eae4] bg-white p-4 shadow-[0_2px_12px_rgba(27,50,39,0.025)] sm:p-5"><div><p className="text-xs font-medium text-[#78847c]">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-[#2b4034]">{value}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-[#818c84]">{trend === 'up' ? <ArrowUpRight className="size-3 text-[#43815b]" /> : trend === 'down' ? <ArrowDownRight className="size-3 text-[#bf6849]" /> : null}{caption}</p></div><span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-[18px]" aria-hidden="true" /></span></article>
}

export default function CarePlanDashboard() {
  const [confirmedCheckIns, setConfirmedCheckIns] = useState(0)

  return (
    <div className="min-h-screen bg-[#f5f7f3] text-[#273b30]">
      <div className="flex min-h-screen">
        <Sidebar />
        <main id="overview" className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-[#e7eae4] bg-[#fbfcf9]/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1460px] items-center justify-between px-4 py-3.5 sm:px-7 lg:px-9"><div className="flex items-center gap-3 lg:hidden"><span className="flex size-9 items-center justify-center rounded-xl bg-[#dcefe5] text-[#1e684f]"><Heart className="size-[18px]" /></span><span className="text-sm font-bold tracking-tight text-[#193b31]">ElderLife <span className="text-[#3d8167]">AI</span></span></div><div className="hidden lg:block"><p className="text-xs font-medium text-[#87928b]">Saturday, October 31, 2026</p><p className="mt-0.5 text-sm font-semibold text-[#3a4d40]">Eleanor&apos;s care dashboard</p></div><div className="ml-auto flex items-center gap-3"><span className="hidden items-center gap-1.5 rounded-full border border-[#dce9df] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#397252] sm:inline-flex"><span className="size-1.5 rounded-full bg-[#4e9a68]" />All systems up to date</span><button type="button" className="relative flex size-10 items-center justify-center rounded-xl border border-[#e7eae4] bg-white text-[#627169] transition hover:bg-[#f3f5f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700" aria-label={`Notifications, ${confirmedCheckIns > 0 ? 1 : 2} alerts`}><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-[#c85048]" /></button><div className="flex size-9 items-center justify-center rounded-full bg-[#e8eee7] text-xs font-bold text-[#4e6b55]" aria-label="Signed in as Alice Mitchell">AM</div></div></div>
          </header>

          <div className="mx-auto max-w-[1460px] px-4 pb-10 pt-6 sm:px-7 sm:pt-8 lg:px-9">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4" aria-labelledby="welcome-heading"><div><div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#e8f1e9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#477154]"><Sparkles className="size-3" aria-hidden="true" />Your care overview</div><h1 id="welcome-heading" className="text-[26px] font-bold tracking-tight text-[#22392d] sm:text-[30px]">Good morning, Alice</h1><p className="mt-1.5 text-sm text-[#718077]">Here&apos;s how Eleanor&apos;s day is going so far.</p></div><div className="flex items-center gap-2 rounded-xl border border-[#e3e8e1] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#56655b]"><CalendarDays className="size-4 text-[#67816d]" aria-hidden="true" />Saturday, Oct 31 <ChevronRight className="size-3.5 text-[#9aa49d]" aria-hidden="true" /></div></div>

            <section aria-label="Daily care summary" className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4 sm:gap-4">
              <SummaryCard label="Today's medications" value="1 of 4" caption="1 missed dose" icon={Pill} tone="bg-[#f8ece5] text-[#a66a45]" trend="down" />
              <SummaryCard label="Check-ins complete" value={`${confirmedCheckIns} of 3`} caption="Next one at 2:00 PM" icon={Clock3} tone="bg-[#eef0fa] text-[#6c6da0]" />
              <SummaryCard label="Water intake" value="5 cups" caption="3 cups to daily goal" icon={Droplets} tone="bg-[#e9f3f7] text-[#43849b]" trend="up" />
              <SummaryCard label="Meals today" value="1 of 4" caption="Lunch planned for 12:30" icon={Utensils} tone="bg-[#f5efe3] text-[#a38240]" />
            </section>

            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,0.95fr)]">
              <div className="flex min-w-0 flex-col gap-5"><CarePlanCard /><ProfileCard /></div>
              <div className="flex min-w-0 flex-col gap-5"><AlertsCard morningConfirmed={confirmedCheckIns > 0} /><CheckInCard onCheckInConfirmed={() => setConfirmedCheckIns((current) => current + 1)} /></div>
            </div>
            <footer className="mt-8 flex flex-col gap-1 border-t border-[#e3e8e1] pt-4 text-[10px] leading-relaxed text-[#89948c] sm:flex-row sm:items-center sm:justify-between"><p>ElderLife AI supports your care routine. It does not replace professional medical advice.</p><p>Need urgent help? Contact your care team or local emergency services.</p></footer>
          </div>
        </main>
      </div>
    </div>
  )
}
