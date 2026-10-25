import type { ReactElement } from "react"
import type { MockName } from "../data/site"
import { CreatorFan } from "./CreatorFan"
import { BusinessSite, LandingSite, RevampSite, StartupSite } from "./WorkSamples"

function CreatorMock() {
  return <CreatorFan />
}

function StartupMock() {
  return <StartupSite />
}

function BusinessMock() {
  return <BusinessSite />
}

function LandingMock() {
  return <LandingSite />
}

function RevampMock() {
  return <RevampSite />
}

const mockups: Record<MockName, () => ReactElement> = {
  creator: CreatorMock,
  startup: StartupMock,
  business: BusinessMock,
  landing: LandingMock,
  revamp: RevampMock,
}

export function Mockup({ name }: { name: MockName }) {
  const View = mockups[name]
  return <View />
}

function CartMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-2.5" aria-hidden="true">
      <path d="M3.2 4.6h9.6l-.9 6.6a1 1 0 0 1-1 .8H5.1a1 1 0 0 1-1-.8l-.9-6.6Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.1 4.4a1.9 1.9 0 0 1 3.8 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function InfluencerMock({ name }: { name?: string } = {}) {
  const title = name?.trim() || "Aarohi Mehta"
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#e4b133] text-[#1c1c1c]" aria-hidden="true">
      <img
        src="/influencer-plate.jpg"
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[56%] object-cover object-[74%_38%] grayscale contrast-125"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#e4b133_0_32%,rgb(228_177_51/0.94)_44%,rgb(228_177_51/0.28)_58%,transparent_72%)]" />

      <div className="relative flex items-center justify-between gap-2 px-3.5 pt-2.5">
        <span className="block max-w-[9rem] truncate font-serif text-[15px] italic leading-none">{title}</span>
        <span className="hidden items-center gap-2.5 text-[9px] font-medium lg:flex">
          <span>Work</span>
          <span>Journal</span>
          <span className="rounded-full bg-[#1c1c1c] px-2 py-1 text-[8px] text-white">Let's Connect</span>
        </span>
      </div>

      <div className="relative flex max-w-[50%] flex-1 flex-col px-3.5 pt-2.5">
        <p className="text-[8px] font-semibold tracking-[0.16em]">CREATOR · TRAVEL · LIFESTYLE</p>
        <p className="mt-1.5 font-serif text-[1.15rem] leading-[0.94] tracking-[-0.03em] lg:text-[1.55rem]">
          Stories, places and the people in between.
        </p>
        <p className="mt-1.5 hidden max-w-[24ch] text-[10px] leading-snug text-[#1c1c1c]/75 lg:block">
          I create content that feels real, not just pretty.
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#1c1c1c] px-2.5 py-1 text-[9px] font-medium text-white lg:mt-2.5 lg:py-1.5">
          Explore My Work <span aria-hidden="true">→</span>
        </span>
        <span className="mt-2.5 hidden items-center gap-2 text-[#1c1c1c] lg:flex" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="size-3.5">
            <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="11.4" cy="4.6" r="0.7" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 16 16" className="size-3.5">
            <path d="M6.2 4.2 11.5 8 6.2 11.8V4.2z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 16 16" className="size-3">
            <path d="M3 3.5 6.6 8.4 3.2 12.5h1.3l2.6-3 2.1 3H13L9.2 7.4 12.4 3.5h-1.3L8.7 6.3 6.8 3.5H3z" fill="currentColor" />
          </svg>
        </span>
      </div>

      <div className="relative mx-2.5 mb-2.5 flex max-w-[15.5rem] items-center gap-2 self-start rounded-xl bg-white px-2 py-1.5 shadow-[0_12px_24px_-16px_rgba(28,28,28,0.5)]">
        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#1c1c1c] font-serif text-[11px] italic text-white">01</span>
        <span className="min-w-0">
          <span className="block text-[7.5px] font-semibold uppercase tracking-[0.14em] text-[#1c1c1c]/45">Latest story</span>
          <span className="block truncate text-[11px] font-medium leading-tight">The long way home</span>
        </span>
      </div>
    </div>
  )
}

export function BoutiqueMock({ name }: { name?: string } = {}) {
  const title = name?.trim() || "The boutique"
  return (
    <div
      className="relative h-full min-h-0 overflow-hidden bg-[#ead9c5] text-[#2a2118]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #ead9c5 0 40%, rgb(234 217 197 / 0) 56%), url(/boutique-plate.jpg)",
        backgroundPosition: "center, 88% 42px",
        backgroundSize: "auto, auto 132%",
      }}
      aria-hidden="true"
    >
      <svg className="pointer-events-none absolute right-3 top-16 h-14 w-7 text-[#2a2118]" viewBox="0 0 40 90" aria-hidden="true">
        <path d="M6 8l16 28M16 4l18 22M4 36l18 30M22 58l14 22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="relative flex items-center justify-between gap-3 px-3.5 pr-24 pt-2.5">
        <span className="block max-w-[10rem] truncate font-serif text-[15px] italic leading-none">{title}</span>
        <span className="hidden items-center gap-3 text-[9px] font-semibold @min-[460px]:flex">
          <span>New</span>
          <span>Objects</span>
          <span>Visit</span>
        </span>
      </div>

      <div className="relative grid h-[calc(100%-2.15rem)] grid-cols-[1.08fr_0.92fr]">
        <div className="min-w-0 px-3.5 pt-3">
          <span className="inline-flex rounded-full border border-[#2a2118] px-2 py-0.5 text-[7.5px] font-semibold tracking-[0.14em]">
            BOUTIQUE · YOUR CITY
          </span>
          <p className="mt-2 font-serif text-[1.65rem] leading-[0.86] tracking-[-0.035em] @min-[460px]:text-[1.95rem]">
            Clothes and
            <span className="block">
              objects, <span className="italic">edited.</span>
            </span>
          </p>
          <p className="mt-2 font-serif text-[13px] italic leading-none">New in the room.</p>
          <p className="mt-1.5 max-w-[24ch] text-[9.5px] leading-snug">
            A small shop. Coats, ceramics, and a fitting when you ask.
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#2a2118] px-2.5 py-1.5 text-[9px] font-medium text-[#f6f1ea]">
              Buy
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#2a2118]/25 bg-white/80 px-2.5 py-1.5 text-[9px] font-medium">
              <CartMark />
              Cart
            </span>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -left-8 -top-1 z-10 flex -rotate-6 items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-[0_10px_24px_-14px_rgba(42,33,24,0.45)]">
            <span className="size-5 rounded-md bg-[#c4a574]" />
            <span>
              <span className="block text-[13px] font-bold leading-none tracking-tight">Coat</span>
              <span className="text-[8px] leading-none text-[#2a2118]/65">New this week</span>
            </span>
          </div>

          <div className="absolute right-1 top-9 z-10 flex rotate-3 items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-[0_10px_24px_-14px_rgba(42,33,24,0.45)]">
            <span className="size-5 rounded-full bg-[#d7c3a3]" />
            <span>
              <span className="block text-[13px] font-bold leading-none tracking-tight">Ceramic</span>
              <span className="text-[8px] leading-none text-[#2a2118]/65">In the room</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClinicMock({ name }: { name?: string } = {}) {
  const title = name?.trim() || "The clinic"
  return (
    <div
      className="relative h-full min-h-0 overflow-hidden bg-[#bfc7af] text-[#1c2b22]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #bfc7af 0 40%, rgb(191 199 175 / 0) 56%), url(/clinic-plate.jpg)",
        backgroundPosition: "center, 90% 20px",
        backgroundSize: "auto, auto 132%",
      }}
      aria-hidden="true"
    >
      <svg className="pointer-events-none absolute right-3 top-16 h-14 w-7 text-[#1c2b22]" viewBox="0 0 40 90" aria-hidden="true">
        <path d="M6 8l16 28M16 4l18 22M4 36l18 30M22 58l14 22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="relative flex items-center justify-between gap-3 px-3.5 pr-24 pt-2.5">
        <span className="block max-w-[10rem] truncate font-serif text-[15px] italic leading-none">{title}</span>
        <span className="hidden items-center gap-3 text-[9px] font-semibold @min-[460px]:flex">
          <span>Care</span>
          <span>Hours</span>
          <span>Visit</span>
        </span>
      </div>

      <div className="relative grid h-[calc(100%-2.15rem)] grid-cols-[1.08fr_0.92fr]">
        <div className="min-w-0 px-3.5 pt-3">
          <span className="inline-flex rounded-full border border-[#1c2b22] px-2 py-0.5 text-[7.5px] font-semibold tracking-[0.14em]">
            CLINIC · YOUR CITY
          </span>
          <p className="mt-2 font-serif text-[1.65rem] leading-[0.86] tracking-[-0.035em] @min-[460px]:text-[1.95rem]">
            See someone
            <span className="block">
              <span className="italic">this week.</span>
            </span>
          </p>
          <p className="mt-2 font-serif text-[13px] italic leading-none">Appointments, kept short.</p>
          <p className="mt-1.5 max-w-[26ch] text-[9.5px] leading-snug">
            A consultation or a follow-up. Book a time without a call.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1">
            <span className="rounded-full border border-[#1c2b22]/25 bg-white/70 px-1.5 py-0.5 text-[8px] font-medium">Consultation</span>
            <span className="rounded-full border border-[#1c2b22]/25 bg-white/70 px-1.5 py-0.5 text-[8px] font-medium">Follow-up</span>
          </div>
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1c2b22] px-2.5 py-1.5 text-[9px] font-medium text-white">
              Book appointment
            </span>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -left-6 top-0 z-10 flex -rotate-6 items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-[0_10px_24px_-14px_rgba(28,43,34,0.45)]">
            <span className="grid size-5 place-items-center rounded-full bg-[#1f6b4a] text-white">
              <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6 3.4V6l1.8 1.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-[13px] font-bold leading-none tracking-tight">30 min</span>
              <span className="text-[8px] leading-none text-[#1c2b22]/65">Consultation</span>
            </span>
          </div>

          <div className="absolute right-1 top-9 z-10 flex rotate-3 items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-[0_10px_24px_-14px_rgba(28,43,34,0.45)]">
            <span className="grid size-5 place-items-center rounded-md bg-[#1c2b22] text-white">
              <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                <rect x="1.6" y="2.4" width="8.8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.6 5h8.8M4 1.6v1.8M8 1.6v1.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-[13px] font-bold leading-none tracking-tight">Mon–Sat</span>
              <span className="text-[8px] leading-none text-[#1c2b22]/65">Open hours</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


export function JewelleryMock({ name }: { name?: string } = {}) {
  const title = name?.trim() || "The jeweller"
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f6f1ea] text-[#241c16]" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 border-b border-[#241c16]/10 px-3 py-2">
        <span className="block max-w-[8rem] truncate font-serif text-[14px] italic leading-none">{title}</span>
        <span className="hidden items-center gap-2.5 text-[9px] font-medium lg:flex">
          <span>Rings</span>
          <span>Chains</span>
          <span>Visit</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#241c16]/15 px-1.5 py-1 text-[8px] font-medium">
          <CartMark />1
        </span>
        <span className="rounded-full bg-[#241c16] px-2 py-1 text-[8px] font-medium text-[#f6f1ea]">Buy now</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[0.82fr_1.18fr]">
        <div className="flex min-w-0 flex-col px-3 py-2.5">
          <p className="text-[8px] font-semibold tracking-[0.14em]">JEWELLERY · YOUR CITY</p>
          <p className="mt-1.5 font-serif text-[1.15rem] leading-[0.94] tracking-[-0.03em] lg:text-[1.45rem]">
            Gold, kept <span className="italic">close.</span>
          </p>
          <p className="mt-1.5 hidden max-w-[16ch] text-[10px] leading-snug text-[#241c16]/70 lg:block">
            Rings, chains, and a piece made when you ask.
          </p>
          <div className="mt-auto w-full max-w-[11rem] rounded-xl bg-white p-2 shadow-[0_16px_28px_-18px_rgba(36,28,22,0.65)] ring-1 ring-[#241c16]/10">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#241c16]/45">The piece</span>
              <span className="text-[10px] leading-none text-[#241c16]/40" aria-hidden="true">×</span>
            </div>
            <p className="mt-0.5 font-serif text-[13px] leading-tight">Signet ring</p>
            <p className="text-[10px] font-semibold">₹24,000</p>
            <div className="mt-1.5 flex gap-1">
              <span className="rounded-full bg-[#241c16] px-2 py-0.5 text-[8px] font-medium text-[#f6f1ea]">Buy now</span>
              <span className="inline-flex items-center gap-0.5 rounded-full border border-[#241c16]/15 px-1.5 py-0.5 text-[8px] font-medium">
                <CartMark />
                Cart
              </span>
            </div>
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[1.15fr_0.85fr] gap-1.5 py-2 pr-2">
          <article className="flex min-h-0 overflow-hidden rounded-lg bg-white shadow-[0_8px_18px_-14px_rgba(36,28,22,0.6)]">
            <img src="/jewellery-ring.jpg" alt="" className="h-full w-[46%] object-cover" />
            <div className="flex min-w-0 flex-1 flex-col justify-center px-2">
              <span className="text-[7.5px] font-semibold uppercase tracking-[0.12em] text-[#241c16]/45">In the case</span>
              <span className="font-serif text-[13px] leading-tight">Signet ring</span>
              <span className="mt-0.5 text-[10px] font-semibold">₹24,000</span>
            </div>
          </article>
          <div className="grid min-h-0 grid-cols-2 gap-1.5">
            <article className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-white">
              <div className="relative min-h-0 flex-1">
                <img src="/jewellery-chain.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="px-1.5 py-1">
                <span className="block text-[9px] font-medium leading-none">Chain</span>
                <span className="text-[8px] text-[#241c16]/55">₹18,500</span>
              </div>
            </article>
            <article className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-white">
              <div className="relative min-h-0 flex-1">
                <img src="/jewellery-studs.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="px-1.5 py-1">
                <span className="block text-[9px] font-medium leading-none">Studs</span>
                <span className="text-[8px] text-[#241c16]/55">₹9,200</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HotelMock({ name }: { name?: string } = {}) {
  const title = name?.trim() || "The hotel"
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f3eee6] text-[#1b2430]" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="block max-w-[8rem] truncate font-serif text-[14px] italic leading-none">{title}</span>
        <span className="hidden items-center gap-2.5 text-[9px] font-medium lg:flex">
          <span>Rooms</span>
          <span>Dining</span>
          <span>Visit</span>
        </span>
        <span className="rounded-full bg-[#1b2430] px-2 py-1 text-[8px] font-medium text-white">Book now</span>
      </div>
      <div className="relative mx-2 mb-2 min-h-0 flex-1 overflow-hidden rounded-xl">
        <img src="/hotel-room.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_62%]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_28_36/0.42)_0%,transparent_42%,rgb(20_28_36/0.55)_100%)]" />
        <div className="absolute left-2.5 top-2.5 max-w-[78%]">
          <p className="text-[8px] font-semibold tracking-[0.14em] text-white">HOTEL · YOUR CITY</p>
          <p className="mt-1 font-serif text-[1.2rem] leading-[0.92] tracking-[-0.03em] text-white lg:text-[1.55rem]">
            Stay the <span className="italic">night.</span>
          </p>
        </div>
        <div className="absolute inset-x-2 bottom-11 flex gap-1">
          {["King room", "Breakfast", "Pickup"].map((option) => (
            <span key={option} className="rounded-full bg-white/92 px-1.5 py-0.5 text-[7.5px] font-medium text-[#1b2430]">
              {option}
            </span>
          ))}
        </div>
        <div className="absolute inset-x-2 bottom-2 grid grid-cols-[1fr_1fr_0.7fr_auto] items-center overflow-hidden rounded-lg bg-white text-[8px] text-[#1b2430] shadow-[0_10px_24px_-16px_rgba(16,19,27,0.55)]">
          {[
            ["Arrive", "Fri"],
            ["Leave", "Sun"],
            ["Guests", "2"],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-[#1b2430]/10 px-1.5 py-1.5">
              <span className="block text-[#1b2430]/45">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
          <span className="m-1 rounded-md bg-[#1b2430] px-2 py-1.5 text-center font-medium text-white">Book now</span>
        </div>
      </div>
    </div>
  )
}
