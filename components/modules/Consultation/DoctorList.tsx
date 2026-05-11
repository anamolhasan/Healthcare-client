/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getDoctors } from "@/services/doctor.service";
// import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";
import { useQuery } from "@tanstack/react-query";

const DoctorList = () => {
  const { data : doctorData} = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });
  // console.log(data)
  return (
    <>
      <div>
        {doctorData!.data.map((doctor: any) => (
          <div key={doctor.id}>{doctor.name}</div>
        ))}
      </div>
    </>
  );
};

export default DoctorList;
