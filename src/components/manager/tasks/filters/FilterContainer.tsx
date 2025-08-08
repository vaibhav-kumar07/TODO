'use client';

import React from 'react';
import SearchFilter from '@/components/common/filters/SearchFilter'; 
import StatusFilter from '../../../common/filters/StatusFilter';
import PriorityFilter from './PriorityFilter';
import DueDateFilter from './DueDateFilter';
import AllFilter from '../../../common/filters/AllFilter';

export default function FilterContainer() {
  return (
    <div className="w-fit flex flex-wrap items-center gap-2 px-2 py-1 ">
      <AllFilter  className='w-fit'/>    
      <StatusFilter />
      <PriorityFilter />
      <SearchFilter className='w-full sm:w-fit sm:ml-auto' />
      <DueDateFilter />
    </div>
  );
} 