import data from './data/data.json';

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

export interface Branding{
    title: string;
    title_short: string;
}

export const BRANDING: Branding = data["branding"];
export const Schedule: ScheduleItem[] = data["schedule"];
export const INCENTIVES: Incentive[] = data["incentives"]; 
