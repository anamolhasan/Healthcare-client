'use client'

import { createMyDoctorScheduleAction } from "@/app/(dashboardLayout)/doctor/dashboard/my-schedules/_action"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"


const getTodayStartIsoString = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.toISOString()
}

const formatDateTime = (value: string | Date) => {
  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) {
    return "Invalid date"
  }

  return format(dateValue, "MMM dd, yyyy hh:mm a")
}


const BookScheduleModal = () => {
  const [open, setOpen] = useState(false)
  const [selectScheduleIds, setSelectScheduleIds] = useState<string[]>([])

  const queryClient = useQueryClient()
  const router = useRouter()

  const {mutateAsync, isPending} = useMutation({
    mutationFn:createMyDoctorScheduleAction
  })

  const futureSchedulesQueryString = useMemo(()=>{
    const params = new URLSearchParams()
    params.set('page', '1')
    params.set('limit','500')
    params.set('sortby', 'startDateTime')
    params.set('sortOrder', 'asc')
    params.set('sortDateTime[gte]', getTodayStartIsoString( ))
    return params.toString()
  },[])

  const {data:schedulesResponse, isLoading:isLoadingSchedules} = useQuery({
    
  })
   return (
    <div>BookScheduleModal</div>
  )
}

export default BookScheduleModal