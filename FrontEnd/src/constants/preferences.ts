export enum Preference {
  femaleOnly = 'Female only',
  maleOnly = 'Male only',
  coed = 'Co-ed',
  clean = 'Clean',
  quiet = 'Quiet',
  partyOk = 'Party OK',
  noParty = 'No party',
  extrovert = 'Extrovert',
  introvert = 'Introvert',
  nightOwl = 'Night owl',
  earlyBird = 'Early bird',
  _420Friendly = '420 friendly',
  smokeFree = 'Smoke free',
  lgbtqFriendly = 'LGBTQ+ friendly',
  overnightGuestOk = 'Overnight guest OK',
  noOvernightGuest = 'No overnight Guest',
}

export const preferences = Object.values(Preference);
