export const PARTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Arden: {
    bg: 'bg-emerald-100 dark:bg-emerald-950',
    text: 'text-emerald-900 dark:text-emerald-100',
    border: 'border-emerald-500'
  },
  Clairia: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-900 dark:text-slate-100',
    border: 'border-slate-400 dark:border-slate-500'
  },
  "P'Loa": {
    bg: 'bg-teal-100 dark:bg-teal-950',
    text: 'text-teal-900 dark:text-teal-100',
    border: 'border-teal-500'
  },
  'Uri-Kesh': {
    bg: 'bg-red-100 dark:bg-red-950',
    text: 'text-red-900 dark:text-red-100',
    border: 'border-red-500'
  },
  Doloron: {
    bg: 'bg-pink-100 dark:bg-pink-950',
    text: 'text-pink-900 dark:text-pink-100',
    border: 'border-pink-500'
  },
  Sythwan: {
    bg: 'bg-yellow-100 dark:bg-yellow-950',
    text: 'text-yellow-900 dark:text-yellow-100',
    border: 'border-yellow-500'
  },
  Noctara: {
    bg: 'bg-purple-100 dark:bg-purple-950',
    text: 'text-purple-900 dark:text-purple-100',
    border: 'border-purple-500'
  },
  Keer: {
    bg: 'bg-blue-100 dark:bg-blue-950',
    text: 'text-blue-900 dark:text-blue-100',
    border: 'border-blue-500'
  },
  Waylon: {
    bg: 'bg-orange-100 dark:bg-orange-950',
    text: 'text-orange-900 dark:text-orange-100',
    border: 'border-orange-500'
  },
  Elsewhich: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    border: 'border-gray-500'
  },
  Glendeep: {
    bg: 'bg-cyan-100 dark:bg-cyan-950',
    text: 'text-cyan-900 dark:text-cyan-100',
    border: 'border-cyan-500'
  }
};

export function getPartyColor(partyName: string) {
  return PARTY_COLORS[partyName] || {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-900 dark:text-slate-100',
    border: 'border-slate-400'
  };
}
