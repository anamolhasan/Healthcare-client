'use client'

import { IDoctor, IDoctorDetails } from "@/types/doctor.types"
import { format } from "date-fns"
import { date } from "zod"


interface ViewDoctorProfileDialogProps {
    open : boolean
    onOpenChange: (open: boolean) => void
    doctor : IDoctor | null
}

const formatDateTime = (value ?: string | Date | null) => {
    if(!value){
        return "N/A"
    }

    const dateValue = new Date(value)
    if(Number.isNaN(dateValue.getTime())){
        return 'N/A'
    }

    return format(dateValue, 'MMM dd, yyyy hh:mm a')
}

const getAverageRating = (reviews: IDoctorDetails['reviews']) => {
    if(!reviews || reviews.length === 0){
        return 0
    }

    const totalRating = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0)
    return totalRating / reviews.length
}
const ViewDoctorProfileDialog = () => {
  return (
    <div>ViewDoctorProfileDialog</div>
  )
}

export default ViewDoctorProfileDialog