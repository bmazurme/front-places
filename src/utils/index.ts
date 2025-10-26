export const populateArray = (size: number, multiplier = 1) => [...Array(size)]
  .map((_, i) => i * multiplier);

export const shuffleArray = (array: number[]) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
};

// export const isServer = !(
//   typeof window !== 'undefined'
//     && window.document
//     && window.document.createElement
// );

export const MODAL_CONFIG = {
  INITIAL: {
    opacity: 0,
    scale: 0.75,
  },
  ANIMATE: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.35,
    },
  },
  EXIT: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: 'easeIn',
      duration: 0.35,
    },
  },
};
