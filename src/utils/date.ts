import { MONTHS } from "../constants"

export const getMonthsByIndex = (from: number, to: number): string[] => {
  return MONTHS.filter((_, index) => index >= from && index <= to)
}
