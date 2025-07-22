export const interpretNoteMediane = (note: number): string => {
  switch (true) {
    case note < 2:
      return 'Acheter';
    case note < 3:
      return 'Renforcer';
    case note < 3.5:
      return 'Conserver';
    case note < 4:
      return 'Alléger';
    default:
      return 'Vendre';
  }
};
