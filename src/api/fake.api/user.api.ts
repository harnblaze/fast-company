import { IProfession, professionsObject } from "./professions.api";

interface IQuality {
  _id: string;
  name: string;
  color: string;
}

interface IQualities {
  [name: string]: IQuality;
}

const qualities: IQualities = {
  tedious: {
    _id: "67rdca3eeb7f6fgeed471198",
    name: "Нудила",
    color: "primary",
  },
  strange: {
    _id: "67rdca3eeb7f6fgeed471100",
    name: "Странный",
    color: "secondary",
  },
  buller: { _id: "67rdca3eeb7f6fgeed4711012", name: "Троль", color: "success" },
  alcoholic: {
    _id: "67rdca3eeb7f6fgeed471101",
    name: "Алкоголик",
    color: "danger",
  },
  handsome: {
    _id: "67rdca3eeb7f6fgeed471102",
    name: "Красавчик",
    color: "info",
  },
  uncertain: {
    _id: "67rdca3eeb7f6fgeed471103",
    name: "Неуверенный",
    color: "dark",
  },
};

interface IUser {
  _id: string;
  name: string;
  profession: IProfession;
  qualities: IQuality[];
  completedMeetings: number;
  rate: number;
  bookmark: boolean;
}

const users: IUser[] = [
  {
    _id: "67rdca3eeb7f6fgeed471815",
    name: "Джон Дориан",
    profession: professionsObject.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471816",
    name: "Кокс",
    profession: professionsObject.doctor,
    qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471817",
    name: "Боб Келсо",
    profession: professionsObject.doctor,
    qualities: [qualities.buller],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471818",
    name: "Рэйчел Грин",
    profession: professionsObject.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471819",
    name: "Шелдон Купер",
    profession: professionsObject.physics,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471820",
    name: "Леонард Хофстедтер",
    profession: professionsObject.physics,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471821",
    name: "Говард Воловиц",
    profession: professionsObject.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471822",
    name: "Никола Тесла",
    profession: professionsObject.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471823",
    name: "Моника Геллер",
    profession: professionsObject.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed471824",
    name: "Рататуй",
    profession: professionsObject.cook,
    qualities: [qualities.handsome, qualities.buller],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed47181f",
    name: "Джоуи Триббиани",
    profession: professionsObject.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false,
  },
  {
    _id: "67rdca3eeb7f6fgeed47181r",
    name: "Брэд Питт",
    profession: professionsObject.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false,
  },
];

const fetchAll = async (): Promise<IUser[]> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
const getById = async (id: string): Promise<IUser | undefined> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.find((user) => user._id === id));
    }, 1000);
  });

export default {
  fetchAll,
  getById,
};

export type { IUser };
