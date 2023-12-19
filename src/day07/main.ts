export const Day07 = {
  partOne: (input: string): number => {
    const result = input.split("\n").map((hand) => {
      const [cardsString, bidString] = hand.split(" ");
      const cards = Array.from(cardsString);
      const bid = Number(bidString);
      return { cards, bid };
    });
    console.log(result);
    console.log(evaluateCards(result[2].cards));
    console.log(
      "maxNumberOfType",
      maxNumberOfType(getInfoOnHands(["K", "K", "6", "7", "7"])),
    );
    return 0;
  },

  partTwo: (input: string): number => {
    return 0;
  },
};

type Cards = string[];

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
  cardType: string;
  number: number;
};

// Tests
function maxNumberOfType(handInfo: HandInfo[]): number {
  return handInfo.reduce(
    (cur, next) => (next.number > cur ? next.number : cur),
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
      number: cards.filter((card) => card === cardType).length,
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
