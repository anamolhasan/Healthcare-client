export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETE = "DELETED",
}

export interface IDoctor {
  id: number;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber: string;
  experience?: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  createdAt: Date;
  user: {
    status: UserStatus;
  };
  specialties: Array<{
    specialtyId: string;
    doctorId: string;
    specialty: {
      id: string;
      title: string;
      icon: string;
    };
  }>;
}


export interface ICreateDoctorPayload {
   password: string;
   doctor: {
    name: string;
    email: string;
    contactNumber: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender:Gender.MALE | Gender.FEMALE;
    appointmentFee:number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
   };
   specialties: string[];
}

export interface IUpdateDoctorSpecialtyChange {
  specialtyId : string;
  shouldDelete?:boolean;
}

export interface IUpdateDoctorPayload {
  doctor ?: {
    name?: string;
    contactNumber?: string;
    address?:string;
    registrationNumber?:string;
    experience?:number;
    gender?:Gender.MALE | Gender.FEMALE;
    appointmentFee?:number;
    qualification?:string;
    currentWorkingPlace?:string;
    designation?:string;
  };
  specialties?:IUpdateDoctorSpecialtyChange[];
}

export interface IDoctorUserDetails {
  id?:string;
  email?:string;
  name?:string;
  role?:string;
  status:UserStatus;
  emailVerified?:boolean;
  image?:string;
  isDeletedAt?:string | Date | null;
  cratedAt?: string | Date;
  updatedAt ?: string | Date;
}

export interface IDoctorReview {
  id?: string;
  rating?: number;
  comment?:string;
  patientId?:string;
  cratedAt?: string | Date;
}

export interface IDoctorScheduleItem {
  id?:string;
  isBooking?:boolean;
  schedule?:{
    id?:string;
    startDateTime?: string | Date;
    endDateTime ?: string | Date;
  }
}

export interface IDoctorAppointmentItem {
  id?: string;
  status?: string;
  cratedAt ?: string;
  patient?:{
    id?: string;
    name?: string;
    email?:string;
  };
  schedule?:{
    id?:string;
    startDateTime?:string | Date;
    endDateTime?: string | Date;
  };
  prescription?:{
    id?:string;
  } | null;
}

export interface IDoctorDetails extends IDoctor {
  user: IDoctorUserDetails;
  appointments?:IDoctorAppointmentItem[];
  doctorSchedules?:IDoctorScheduleItem[];
  reviews?:IDoctorReview[];
}