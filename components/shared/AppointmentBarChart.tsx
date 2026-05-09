import { BarChartData } from '@/types/dashboard.types'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts'


interface AppointmentBarChartProps {
    data: BarChartData[]
}
const AppointmentBarChart = ({data}: AppointmentBarChartProps) => {

    if(!data || !Array.isArray(data)){
        return (
            <Card className='col-span-4'>
                <CardHeader>
                    <CardTitle>Appointment Trends</CardTitle>
                </CardHeader>
                <CardContent className='flex items-center justify-center h-72'>
                    <p className='text-sm text-muted-foreground'>
                        Invalid data provided for the chart.
                    </p>
                </CardContent>
            </Card>
        )
    }

    const formattedData = data.map((item) => ({
        month: typeof item.month === 'string' ? format(new Date(item.month), 'MM yyyy') : format(item.month, 'MM yyyy'),

        appointment: Number(item.count)
    }))

    if(!formattedData.length || formattedData.every(item => item.appointment === 0)){
        return (
            <Card className='col-span-4'>
                <CardHeader>
                    <CardTitle>Appointment Trends</CardTitle>
                    <CardDescription>Monthly Appointment Statistics</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center h-72'>
                    <p className='text-sm text-muted-foreground'>
                        No appointment data available.
                    </p>
                </CardContent>
            </Card>
        )
    }
  return (
    <Card className='col-span-4'>
        <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
            <CardDescription>Monthly Appointment Statistics</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width={'100%'} height={350}>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray={'3 3'} />
                    <XAxis tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                    dataKey={'appointments'}
                     fill="oklch(0.646 0.222 41.116)"
                     radius={[4,4,0,0]}
                     maxBarSize={60}
                    />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  )
}

export default AppointmentBarChart