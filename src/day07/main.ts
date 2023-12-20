export const Day07 = {
  partOne: (input: string): number => {
    const result: Hand[] = inputToHandsPart1(input);
    let five: Hand[] = [];
    let four: Hand[] = [];
    let full: Hand[] = [];
    let three: Hand[] = [];
    let twoPair: Hand[] = [];
    let pair: Hand[] = [];
    let high: Hand[] = [];
    result.forEach((hand) => {
      switch (evaluateCards(hand.cards)) {
        case "FIVE_OAK":
          five.push(hand);
          break;
        case "FOUR_OAK":
          four.push(hand);
          break;
        case "FULL_HOUSE":
          full.push(hand);
          break;
        case "THREE_OAK":
          three.push(hand);
          break;
        case "TWO_PAIR":
          twoPair.push(hand);
          break;
        case "ONE_PAIR":
          pair.push(hand);
          break;
        case "HIGH_CARD":
          high.push(hand);
          break;
      }
    });
    const solution = sortCardsInSameRankSpecial(high)
      .concat(sortCardsInSameRankSpecial(pair))
      .concat(sortCardsInSameRankSpecial(twoPair))
      .concat(sortCardsInSameRankSpecial(three))
      .concat(sortCardsInSameRankSpecial(full))
      .concat(sortCardsInSameRankSpecial(four))
      .concat(sortCardsInSameRankSpecial(five));
    return solution.reduce((cur, next, idx) => cur + (idx + 1) * next.bid, 0);
  },

  partTwo: (input: string): number => {
    const result: Hand[] = inputToHandsPart2(input);
    let five: Hand[] = [];
    let four: Hand[] = [];
    let full: Hand[] = [];
    let three: Hand[] = [];
    let twoPair: Hand[] = [];
    let pair: Hand[] = [];
    let high: Hand[] = [];
    result.forEach((hand) => {
      switch (evaluateCards(convertJacks(hand.cards))) {
        case "FIVE_OAK":
          five.push(hand);
          break;
        case "FOUR_OAK":
          four.push(hand);
          break;
        case "FULL_HOUSE":
          full.push(hand);
          break;
        case "THREE_OAK":
          three.push(hand);
          break;
        case "TWO_PAIR":
          twoPair.push(hand);
          break;
        case "ONE_PAIR":
          pair.push(hand);
          break;
        case "HIGH_CARD":
          high.push(hand);
          break;
      }
    });
    const solution = sortCardsInSameRankSpecial(high)
      .concat(sortCardsInSameRankSpecial(pair))
      .concat(sortCardsInSameRankSpecial(twoPair))
      .concat(sortCardsInSameRankSpecial(three))
      .concat(sortCardsInSameRankSpecial(full))
      .concat(sortCardsInSameRankSpecial(four))
      .concat(sortCardsInSameRankSpecial(five));
    return solution.reduce((cur, next, idx) => cur + (idx + 1) * next.bid, 0);
  },
};

type Cards = number[];

type Hand = {
  cards: Cards;
  bid: number;
};

type Rank =
  | "FIVE_OAK"
  | "FOUR_OAK"
  | "FULL_HOUSE"
  | "THREE_OAK"
  | "TWO_PAIR"
  | "ONE_PAIR"
  | "HIGH_CARD";

type HandInfo = {
  cardType: number;
  amount: number;
};

function inputToHandsPart1(input: string): Hand[] {
  return input.split("\n").map((hand) => {
    const [cardsString, bidString] = hand.split(" ");
    const cards = Array.from(cardsString).map(convertCardCharPart1);
    const bid = Number(bidString);
    return { cards, bid };
  });
}

function inputToHandsPart2(input: string): Hand[] {
  return input.split("\n").map((hand) => {
    const [cardsString, bidString] = hand.split(" ");
    const cards = Array.from(cardsString).map(convertCardCharPart2);
    const bid = Number(bidString);
    return { cards, bid };
  });
}

function maxNumberOfType(handInfo: HandInfo[]): number {
  return handInfo.reduce(
    (cur, next) => (next.amount > cur ? next.amount : cur),
    0,
  );
}

export function getInfoOnHands(cards: Cards): HandInfo[] {
  let infoOnHands: HandInfo[] = [];
  const uniqueCardTypes = new Set(cards);
  uniqueCardTypes.forEach((cardType) => {
    infoOnHands.push({
      cardType,
      amount: cards.filter((card) => card === cardType).length,
    });
  });
  return infoOnHands;
}

export function evaluateCards(cards: Cards): Rank {
  let infoOnHands = getInfoOnHands(cards);
  let result: Rank = "HIGH_CARD";
  if (infoOnHands.length === 1) {
    result = "FIVE_OAK";
  } else if (maxNumberOfType(infoOnHands) === 4) {
    result = "FOUR_OAK";
  } else if (infoOnHands.length === 2) {
    result = "FULL_HOUSE";
  } else if (maxNumberOfType(infoOnHands) === 3) {
    result = "THREE_OAK";
  } else if (infoOnHands.length === 3) {
    result = "TWO_PAIR";
  } else if (infoOnHands.length === 4) {
    result = "ONE_PAIR";
  }
  return result;
}

const cardToNumberConversion = new Map<string, number>([
  ["T", 10],
  ["J", 11],
  ["Q", 12],
  ["K", 13],
  ["A", 14],
]);

export function convertCardCharPart1(cardChar: string): number {
  return Number(cardChar)
    ? Number(cardChar)
    : cardToNumberConversion.get(cardChar) || 0;
}

const cardToNumberConversionPart2 = new Map<string, number>([
  ...cardToNumberConversion,
  ["J", 1],
]);

function convertCardCharPart2(cardChar: string): number {
  return Number(cardChar)
    ? Number(cardChar)
    : cardToNumberConversionPart2.get(cardChar) || 0;
}

export function findFirstDifference(a: number[], b: number[]): number {
  let result = -1;
  if (a.length !== b.length) {
    return result;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      result = i;
      break;
    }
  }
  return result;
}

export function sortCardsInSameRank(cardSets: Cards[]): Cards[] {
  return cardSets.sort((a, b) => sorter(a, b));
}

export function sorter(a: number[], b: number[]): number {
  const differenceIndex = findFirstDifference(a, b);
  if (differenceIndex === -1) {
    return 0;
  }
  return a[differenceIndex] - b[differenceIndex];
}

export function sortCardsInSameRankSpecial(cardSets: Hand[]): Hand[] {
  return cardSets.sort((a, b) => sorter(a.cards, b.cards));
}

export function convertJacks(cards: number[]): number[] {
  const jacks = cards.filter((card) => card === 1);
  if (!jacks.length) {
    return cards;
  }
  const noJacks = cards.filter((card) => card !== 1);
  const handInfo = getInfoOnHands(noJacks);
  const highestOfType = handInfo.reduce(
    (cur, next) => (next.amount > cur.amount ? next : cur),
    { cardType: 1, amount: 0 },
  );
  const convertedJacks = jacks.map(() => highestOfType.cardType);
  return [...noJacks, ...convertedJacks];
}
