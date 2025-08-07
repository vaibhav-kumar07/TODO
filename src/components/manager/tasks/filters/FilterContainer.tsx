'use client';

import React from 'react';
import SearchFilter from '@/components/common/filters/SearchFilter'; 
import StatusFilter from '../../../common/filters/StatusFilter';
import PriorityFilter from './PriorityFilter';
import DueDateFilter from './DueDateFilter';
import AllFilter from '../../../common/filters/AllFilter';

export default function FilterContainer() {
  return (
    <div className="flex flex-wrap items-center gap-2 px-2 py-1 ">
      <AllFilter />    
      <StatusFilter />
      <PriorityFilter />
      <SearchFilter className='ml-auto' />
      <DueDateFilter />
    </div>
  );
} 