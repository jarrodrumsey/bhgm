import { createContext } from "react";
import { initActiveIndex } from "../utils/schedule.utils";
import { Schedule } from "@/app/data";
import moment from "moment-timezone";

export const ActiveIndexContext = createContext(initActiveIndex(Schedule, moment()));
