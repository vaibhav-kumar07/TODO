'use client';

import React from 'react';
import SearchFilter from '@/components/common/filters/SearchFilter'; 
import StatusFilter from '../../common/filters/StatusFilter';
import PriorityFilter from './PriorityFilter';
import DueDateFilter from './DueDateFilter';
import AllFilter from '../../common/filters/AllFilter';

export default function FilterContainer() {
  return (
    <div className="w-fit flex flex-wrap items-center sm:gap-2 px-2 py-1 sm:divide-x sm:divide-gray-200 ">
    <div className="flex items-center flex-wrap sm:divide-x divide-gray-200 gap-2">
    <div className="flex items-center gap-2 px-3">
      <AllFilter  className='px-3'/>    
      </div>
      <div className="flex items-center sm:gap-3 px-3">
      <StatusFilter />
      </div>
      <div className="flex items-center sm:gap-3 px-3">
      <PriorityFilter />
      </div>
      <div className="flex items-center sm:gap-3 px-3">
      <DueDateFilter />
      </div>
     </div>
      <div className='flex items-center gap-3 px-3 mt-3 sm:mt-0'>
      <SearchFilter className='w-full sm:w-fit sm:ml-auto ' />
      </div>
    </div>
  );
} 