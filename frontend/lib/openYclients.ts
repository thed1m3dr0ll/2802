// lib/yclientsConfig.ts

export type YclientsRole = "art_director" | "top_master";

export const YCLIENTS_ROLES: Record<string, YclientsRole> = {
  "3533027": "art_director",
  "3498549": "top_master",
  "3498548": "top_master",
  "4910723": "top_master",
};

export const YCLIENTS_SERVICES_BY_ROLE: Record<
  string,
  { art_director: string; top_master: string }
> = {
  "Мужская стрижка": {
    art_director: "21341952",
    top_master: "17209453",
  },
  'Комплекс "стрижка + борода"': {
    art_director: "21342282",
    top_master: "17404423",
  },
  "Моделирование бороды": {
    art_director: "21342075",
    top_master: "17404445",
  },
  "Детская стрижка": {
    art_director: "21357813",
    top_master: "17404447",
  },
  "Стрижка машинкой": {
    art_director: "21357876",
    top_master: "17404449",
  },
  "Удаление воском": {
    art_director: "24828141",
    top_master: "17404455",
  },
  "Опасное бритье": {
    art_director: "21358053",
    top_master: "17404464",
  },
  Укладка: {
    art_director: "24828258",
    top_master: "17404468",
  },
  "Черная маска": {
    art_director: "24827991",
    top_master: "17404469",
  },
  "Стрижка отец + сын": {
    art_director: "21357765",
    top_master: "17404475",
  },
  "Стрижка ножницами": {
    art_director: "21357735",
    top_master: "17404481",
  },
  "Камуфляж головы": {
    art_director: "21358224",
    top_master: "17404491",
  },
  "Камуфляж бороды": {
    art_director: "21358284",
    top_master: "17404495",
  },
  Патчи: {
    art_director: "24828357",
    top_master: "17965734",
  },
  "Премиум уход за кожей головы и волосами": {
    art_director: "21357675",
    top_master: "19282256",
  },
  "Детокс уход бороды и кожи лица": {
    art_director: "21357723",
    top_master: "19281924",
  },
};
