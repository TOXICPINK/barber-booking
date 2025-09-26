export type Service = {
  id: string;
  name: string;
  durationMin: number;
  price: number;
};

export const services: Service[] = [
  { id: "haircut", name: "اصلاح سر", durationMin: 30, price: 200000 },
  { id: "beard", name: "اصلاح صورت", durationMin: 20, price: 120000 },
  { id: "combo", name: "اصلاح سر + صورت", durationMin: 50, price: 300000 },
];
