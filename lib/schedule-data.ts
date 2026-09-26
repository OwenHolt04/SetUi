export type Stage = 'ua' | 'verizon' | 'zigzag';
export type Day = 'saturday' | 'sunday';

export interface SetTime {
  id: string;
  artist: string;
  stage: Stage;
  startTime: string; // "HH:MM" 24-hr
  endTime: string;
}

// Saturday May 9 — from the Rolling Loud schedule poster
export const saturdaySchedule: SetTime[] = [
  // Under Armour Stage
  { id: 'sat-ua-1',  artist: 'YUME',             stage: 'ua',      startTime: '14:05', endTime: '14:25' },
  { id: 'sat-ua-2',  artist: 'CLIP',             stage: 'ua',      startTime: '14:40', endTime: '15:00' },
  { id: 'sat-ua-3',  artist: 'TKANDZ',           stage: 'ua',      startTime: '15:15', endTime: '15:40' },
  { id: 'sat-ua-4',  artist: 'APOLLORED1',       stage: 'ua',      startTime: '15:55', endTime: '16:20' },
  { id: 'sat-ua-5',  artist: 'MOLLY SANTANA',    stage: 'ua',      startTime: '16:35', endTime: '17:05' },
  { id: 'sat-ua-6',  artist: 'HXG',              stage: 'ua',      startTime: '17:25', endTime: '18:05' },
  { id: 'sat-ua-7',  artist: 'FAKEMINK',         stage: 'ua',      startTime: '18:35', endTime: '19:15' },
  { id: 'sat-ua-8',  artist: 'DESTROY LONELY',   stage: 'ua',      startTime: '19:45', endTime: '20:30' },
  { id: 'sat-ua-9',  artist: 'PLAYBOI CARTI',    stage: 'ua',      startTime: '21:30', endTime: '22:45' },

  // Verizon Stage
  { id: 'sat-vz-1',  artist: 'K SCOTT DJ SET',                    stage: 'verizon', startTime: '13:30', endTime: '14:00' },
  { id: 'sat-vz-2',  artist: 'CHAMPAGNE937',                      stage: 'verizon', startTime: '14:10', endTime: '14:30' },
  { id: 'sat-vz-3',  artist: 'SOWAYV',                            stage: 'verizon', startTime: '14:40', endTime: '15:00' },
  { id: 'sat-vz-4',  artist: 'BABY MEL',                          stage: 'verizon', startTime: '15:10', endTime: '15:30' },
  { id: 'sat-vz-5',  artist: 'KARRAHBOOO',                        stage: 'verizon', startTime: '15:40', endTime: '16:00' },
  { id: 'sat-vz-6',  artist: 'HOOLIGAN HEFS',                     stage: 'verizon', startTime: '16:10', endTime: '16:35' },
  { id: 'sat-vz-7',  artist: 'RO$AMA',                            stage: 'verizon', startTime: '16:45', endTime: '17:10' },
  { id: 'sat-vz-8',  artist: 'UNTILJAPAN',                        stage: 'verizon', startTime: '17:20', endTime: '17:45' },
  { id: 'sat-vz-9',  artist: 'NINO BREEZE',                       stage: 'verizon', startTime: '17:55', endTime: '18:20' },
  { id: 'sat-vz-10', artist: 'DJ FIVE VENOMS & DERRICK MILANO',   stage: 'verizon', startTime: '18:30', endTime: '18:55' },
  { id: 'sat-vz-11', artist: 'BABYCHIEFDOIT',                     stage: 'verizon', startTime: '19:05', endTime: '19:30' },
  { id: 'sat-vz-12', artist: 'SKAI ISYOURGOD',                    stage: 'verizon', startTime: '19:45', endTime: '20:10' },
  { id: 'sat-vz-13', artist: 'NINE VICIOUS',                      stage: 'verizon', startTime: '20:25', endTime: '21:00' },
  { id: 'sat-vz-14', artist: 'RICH THE KID',                      stage: 'verizon', startTime: '21:30', endTime: '22:15' },

  // Zig-Zag Stage
  { id: 'sat-zz-1',  artist: 'PRANKSTISCI DJ SET',                stage: 'zigzag',  startTime: '13:30', endTime: '13:55' },
  { id: 'sat-zz-2',  artist: 'SORISA',                            stage: 'zigzag',  startTime: '14:00', endTime: '14:20' },
  { id: 'sat-zz-3',  artist: 'KELS!',                             stage: 'zigzag',  startTime: '14:30', endTime: '14:50' },
  { id: 'sat-zz-4',  artist: 'SWAPA',                             stage: 'zigzag',  startTime: '15:00', endTime: '15:20' },
  { id: 'sat-zz-5',  artist: 'PRETTIFUN',                         stage: 'zigzag',  startTime: '15:30', endTime: '15:50' },
  { id: 'sat-zz-6',  artist: 'PROTECT',                           stage: 'zigzag',  startTime: '16:00', endTime: '16:20' },
  { id: 'sat-zz-7',  artist: 'BLOODHOUND Q50',                    stage: 'zigzag',  startTime: '16:30', endTime: '16:50' },
  { id: 'sat-zz-8',  artist: 'RAQ BABY',                          stage: 'zigzag',  startTime: '17:00', endTime: '17:20' },
  { id: 'sat-zz-9',  artist: 'B JACK$',                           stage: 'zigzag',  startTime: '17:30', endTime: '17:50' },
  { id: 'sat-zz-10', artist: 'OOGIEMANE B2B ILYKIMCHI DJ SET',    stage: 'zigzag',  startTime: '18:00', endTime: '18:40' },
  { id: 'sat-zz-11', artist: 'CHUCKYY',                           stage: 'zigzag',  startTime: '18:50', endTime: '19:15' },
  { id: 'sat-zz-12', artist: 'FENG',                              stage: 'zigzag',  startTime: '19:25', endTime: '19:50' },
  { id: 'sat-zz-13', artist: 'ADAMN KILLA',                       stage: 'zigzag',  startTime: '20:10', endTime: '20:35' },
  { id: 'sat-zz-14', artist: 'BLEOOD',                            stage: 'zigzag',  startTime: '20:55', endTime: '21:25' },
];

// Sunday May 10
export const sundaySchedule: SetTime[] = [
  // Under Armour Stage
  { id: 'sun-ua-1',  artist: 'FIVE VENOMS & FRIENDS CHOSEN JOURNEY SET', stage: 'ua', startTime: '13:00', endTime: '14:26' },
  { id: 'sun-ua-2',  artist: 'HURRICANE WISDOM',   stage: 'ua', startTime: '14:35', endTime: '14:55' },
  { id: 'sun-ua-3',  artist: 'YKNIECE',            stage: 'ua', startTime: '15:05', endTime: '15:25' },
  { id: 'sun-ua-4',  artist: 'DANNY TOWERS',       stage: 'ua', startTime: '15:35', endTime: '15:55' },
  { id: 'sun-ua-5',  artist: 'LOE SHIMMY',         stage: 'ua', startTime: '16:05', endTime: '16:35' },
  { id: 'sun-ua-6',  artist: 'NOCAP',              stage: 'ua', startTime: '16:50', endTime: '17:20' },
  { id: 'sun-ua-7',  artist: 'BOSSMAN DLOW',       stage: 'ua', startTime: '17:35', endTime: '18:20' },
  { id: 'sun-ua-8',  artist: 'SEXYY RED',          stage: 'ua', startTime: '18:45', endTime: '19:30' },
  { id: 'sun-ua-9',  artist: 'KEN CARSON',         stage: 'ua', startTime: '20:30', endTime: '21:45' },

  // Verizon Stage
  { id: 'sun-vz-1',  artist: 'BIGWESTT',           stage: 'verizon', startTime: '13:00', endTime: '13:20' },
  { id: 'sun-vz-2',  artist: 'OC CHRIS',           stage: 'verizon', startTime: '13:25', endTime: '13:45' },
  { id: 'sun-vz-3',  artist: 'THE KHANS',          stage: 'verizon', startTime: '13:55', endTime: '14:10' },
  { id: 'sun-vz-4',  artist: 'GOLDENBOY COUNTUP',  stage: 'verizon', startTime: '14:20', endTime: '14:40' },
  { id: 'sun-vz-5',  artist: 'JAYY WICK',          stage: 'verizon', startTime: '14:50', endTime: '15:10' },
  { id: 'sun-vz-6',  artist: 'TRIM',               stage: 'verizon', startTime: '15:20', endTime: '15:40' },
  { id: 'sun-vz-7',  artist: 'LUCY BEDROQUE',      stage: 'verizon', startTime: '15:50', endTime: '16:15' },
  { id: 'sun-vz-8',  artist: 'TIACORINE',          stage: 'verizon', startTime: '16:25', endTime: '16:50' },
  { id: 'sun-vz-9',  artist: 'SKAIWATER',          stage: 'verizon', startTime: '17:00', endTime: '17:25' },
  { id: 'sun-vz-10', artist: 'PLAQUEBOYMAX',       stage: 'verizon', startTime: '17:40', endTime: '18:10' },
  { id: 'sun-vz-11', artist: 'CHE',                stage: 'verizon', startTime: '18:25', endTime: '19:00' },
  { id: 'sun-vz-12', artist: 'OSAMASON',           stage: 'verizon', startTime: '19:30', endTime: '20:15' },
  { id: 'sun-vz-13', artist: 'SOULJA BOY',         stage: 'verizon', startTime: '20:30', endTime: '21:15' },

  // Zig-Zag Stage
  { id: 'sun-zz-1',  artist: 'KILLAKAM DJ SET',    stage: 'zigzag', startTime: '12:30', endTime: '13:00' },
  { id: 'sun-zz-2',  artist: 'FLOGO',              stage: 'zigzag', startTime: '13:10', endTime: '13:30' },
  { id: 'sun-zz-3',  artist: 'THIRTEENDEGREES',    stage: 'zigzag', startTime: '13:41', endTime: '14:00' },
  { id: 'sun-zz-4',  artist: 'DIORVSYOU',          stage: 'zigzag', startTime: '14:10', endTime: '14:30' },
  { id: 'sun-zz-5',  artist: '9LIVES DJ SET',      stage: 'zigzag', startTime: '14:40', endTime: '15:10' },
  { id: 'sun-zz-6',  artist: 'FFAWTY',             stage: 'zigzag', startTime: '15:20', endTime: '15:40' },
  { id: 'sun-zz-7',  artist: 'EZCODYLEE',          stage: 'zigzag', startTime: '15:50', endTime: '16:10' },
  { id: 'sun-zz-8',  artist: '130OSAINT',          stage: 'zigzag', startTime: '16:20', endTime: '16:45' },
  { id: 'sun-zz-9',  artist: 'PRADABAGSHAWTY',     stage: 'zigzag', startTime: '17:00', endTime: '17:25' },
  { id: 'sun-zz-10', artist: '1ONEAM',             stage: 'zigzag', startTime: '17:40', endTime: '18:05' },
  { id: 'sun-zz-11', artist: 'NATALIE NUNN',       stage: 'zigzag', startTime: '18:20', endTime: '18:40' },
  { id: 'sun-zz-12', artist: 'YUNG FAZO',          stage: 'zigzag', startTime: '18:55', endTime: '19:20' },
  { id: 'sun-zz-13', artist: 'SKRILLA',            stage: 'zigzag', startTime: '19:30', endTime: '19:55' },
  { id: 'sun-zz-14', artist: 'SLAYR',              stage: 'zigzag', startTime: '20:05', endTime: '20:35' },
];

// Combined schedules by day
export const schedulesByDay: Record<Day, SetTime[]> = {
  saturday: saturdaySchedule,
  sunday: sundaySchedule,
};

export const STAGE_META: Record<Stage, { label: string; short: string; colorClass: string; bgClass: string; textClass: string; borderClass: string }> = {
  ua: {
    label: 'UNDER ARMOUR',
    short: 'UA',
    colorClass: 'bg-[oklch(0.18_0_0)]',
    bgClass: 'bg-[oklch(0.18_0_0)]',
    textClass: 'text-[oklch(0.97_0_0)]',
    borderClass: 'border-[oklch(0.18_0_0)]',
  },
  verizon: {
    label: 'VERIZON',
    short: 'VZ',
    colorClass: 'bg-[oklch(0.52_0.22_24)]',
    bgClass: 'bg-[oklch(0.52_0.22_24)]',
    textClass: 'text-[oklch(0.97_0_0)]',
    borderClass: 'border-[oklch(0.52_0.22_24)]',
  },
  zigzag: {
    label: 'ZIG-ZAG',
    short: 'ZZ',
    colorClass: 'bg-[oklch(0.60_0.24_350)]',
    bgClass: 'bg-[oklch(0.60_0.24_350)]',
    textClass: 'text-[oklch(0.97_0_0)]',
    borderClass: 'border-[oklch(0.60_0.24_350)]',
  },
};

// Timeline bounds: 1:00 PM – 11:00 PM (adjusted for Saturday)
export const TSTART = 13 * 60;       // 780 min (1:00 PM)
export const TEND   = 23 * 60;       // 1380 min (11:00 PM)
export const TDUR   = TEND - TSTART; // 600 min

export function parseTime(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function fmt(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function fmtMins(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function getOrlandoMinutes(): number {
  const now = new Date();
  const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return et.getHours() * 60 + et.getMinutes();
}
