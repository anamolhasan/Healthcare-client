export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken:string;
    user:{
        needPasswordChange:boolean;
        email:string;
        name:string;
        role:string;
        image:string;
        status:string;
        isDeleted:boolean;
        emailVerified:boolean;
    }
}

// export interface TRegisterResponse {
//   success: boolean;
//   message: string;
//   data: {
//     accessToken: string;
//     refreshToken: string;
//     patient: Patient;
//     user: User;
//   };
// };
