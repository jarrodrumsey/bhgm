
import scheduleData from './data/schedule.json';
import incentiveData from './data/incentives.json';

export interface ScheduleItem {
  duration: number;
  imageURL: string;
  event: string;
  console: string;
  who: string;
  time: string; // UTC ISO-8601
}

export interface Incentive {
    title: string;
    amount: number;
    imageURL: string;
}

export const Schedule: ScheduleItem[] = scheduleData;
export const INCENTIVES: Incentive[] = incentiveData; 