export interface IProfession {
  [name: string]: string;
}

export interface IProfessions {
  [name: string]: IProfession;
}

export const professionsObject: IProfessions = {
  doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
};

export const professions: IProfession[] = [
  { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
];

const fetchAll = async (): Promise<IProfession[]> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(professions);
    }, 2000);
  });

export default {
  fetchAll,
};
