export const Day07 = {
  partOne: (input: string): number => {
    const result = input.split("\n").map((hand) => {
      const [cardsString, bidString] = hand.split(" ");
      const cards = Array.from(cardsString).map(convertCardChar);
      const bid = Number(bidString);
      return { cards, bid };
    });
    console.log(result);
    console.log("foo", evaluateCards(result[2].cards));
    console.log(
      "maxNumberOfType",
      maxNumberOfType(getInfoOnHands([13, 13, 6, 7, 7])),
    );
    return 0;
  },

  partTwo: (input: string): number => {
    return 0;
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

// Tests
function maxNumberOfType(handInfo: HandInfo[]): number {
  return handInfo.reduce(
    (cur, next) => (next.amount > cur ? next.amount : cur),
    0,
  );
}

export function getInfoOnHands(cards: Cards): HandInfo[] {
  let infoOnHands: HandInfo[] = [];
  const uniqueCardTypes = new Set(cards);
  console.log("uniqueCardTypes", uniqueCardTypes);
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
  console.log("handInfo", infoOnHands);
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

export function convertCardChar(cardChar: string): number {
  if (Number(cardChar)) {
    return Number(cardChar);
  } else {
    switch (cardChar) {
      case "T":
        return 10;
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;
    }
    return 0; // Should never happen
  }
}
