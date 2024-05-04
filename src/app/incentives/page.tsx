import React from 'react'
import ScheduleHeader from '../components/schedule-header';
import IncentiveList from '../components/incentive-list';
import { INCENTIVES } from '../data';
import NavLink from '../components/nav-link';
import NavButtonList from '../components/nav-button-list';

export default function IncentivePage() {
  
    return (
        <main className={`flex flex-grow box-border flex-col items-center bg-rich-sky relative`}>
          <ScheduleHeader>
            Incentive List
          </ScheduleHeader>
          <div className="w-full max-w-[35rem] h-full">
            <IncentiveList className="" list={INCENTIVES}/> {/** 423 to leave list (423 was just a random number) */}
          </div>
          <div className="sticky bottom-0 right-0 w-full flex justify-end z-[160]">
            <NavButtonList>
                <NavLink title='Main View' href='/'/>
                <NavLink title='Simple View' href='/minimal'/>
            </NavButtonList>
          </div>
        </main>
      );
}

