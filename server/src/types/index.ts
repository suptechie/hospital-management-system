import { Request } from "express";

export interface CustomRequest extends Request {
   patient?: {
      email: string;
      id: string;
   };
}

export enum StatusCode {
   Success = 200,
   Created = 201,
   Accepted = 202,
   NoContent = 204,
   BadRequest = 400,
   Unauthorized = 401,
   Forbidden = 403,
   NotFound = 404,
   Conflict = 409,
   UnprocessableEntity = 422,
   InternalServerError = 500,
   NotImplemented = 501,
   BadGateway = 502,
   ServiceUnavailable = 503,
}

export enum Cookie {
   Admin = "adminToken",
   Patient = "patientToken",
   Doctor = "doctorToken",
}
