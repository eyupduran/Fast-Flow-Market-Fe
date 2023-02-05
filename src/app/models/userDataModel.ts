import { OperationClaimModel } from './operationClaimModel';

export interface UserDataModel{
    userId:number;
    firstName:string;
    lastName:string;
    operationClaims:OperationClaimModel[];
    email:string
    userType:string
}