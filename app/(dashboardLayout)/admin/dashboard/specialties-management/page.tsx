import SpecialtiesTable from '@/components/modules/admin/specialtyManagement/SpecialtiesTable'
import { getSpecialties } from '@/services/specialty.service';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

const SpecialtiesManagementPage = async({
  searchParams,
}:{
  searchParams: Promise<{[key:string]:string | string[] | undefined}>
}) => {
  const queryParamsObjects = await searchParams;

  const queryString = Object.keys(queryParamsObjects)
     .map((key) => {
      const value = queryParamsObjects[key];

      if(value === undefined){
        return ''
      }

      if(Array.isArray(value)){
        return value.map(
          (v)=>
        `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
      ).join('&')
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
     }).filter(Boolean).join('&')

     const queryClient = new QueryClient();

     await queryClient.prefetchQuery({
      queryKey:['specialties', queryString],
      queryFn:()=> getSpecialties(queryString),
      staleTime: 1000 * 60 * 60, // 1 hours
      gcTime: 1000 * 60 * 60 * 6, // 6 hours
     })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SpecialtiesTable  initialQueryString={queryString}/>
    </HydrationBoundary>
  )
}

export default SpecialtiesManagementPage