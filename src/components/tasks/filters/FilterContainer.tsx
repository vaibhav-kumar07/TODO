'use client';

import React from 'react';
import SearchFilter from '@/components/common/filters/SearchFilter'; 
import StatusFilter from '../../common/filters/StatusFilter';
import PriorityFilter from './PriorityFilter';
import DueDateFilter from './DueDateFilter';
import AllFilter from '../../common/filters/AllFilter';

export default function FilterContainer() {
  return (
    <div className="w-fit sm:w-full flex flex-wrap items-center gap-2 px-2 py-1 ">
    <div className="flex items-center gap-2 flex-wrap sm:divide-x divide-gray-200 w-full">
    <div className="flex items-center sm:pr-3">
      <AllFilter  className='w-fit'/>    
      </div>
      <div className="flex items-center gap-3 sm:px-3">
      <StatusFilter />
      </div>
      <div className="flex items-center gap-3 sm:px-3 ">
      <PriorityFilter className=' w-full sm:w-fit gap-2' />
      </div>
    </div>
      <div className="sm:ml-auto w-full sm:w-fit">
      <DueDateFilter />
      </div>
     
      <SearchFilter className='w-full sm:w-fit ' />
    </div>
  );
} 