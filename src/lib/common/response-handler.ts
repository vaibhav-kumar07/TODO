import { ResponseHandlerResult, ErrorCodes } from '@/types/common';


export class ResponseHandler {

  static handleResponse<T = any>(
    response: Response,
    responseData?: any
  ): ResponseHandlerResult<T> {

      // If responseData is provided, use it (for cases where response is already parsed)
      const data = responseData || response;
      console.log("data", data);
        // Handle success response format: { success: true, message: "...", data: {...} }
        if (data.success === true) {
          return {
            success: data.success,
            data: data.data,
            message: data.message,
          };
        } else {
          // Handle error response format: { success: false, message: "...", error: {...} }
          return {
            success: data.success,
            message: data.message,
            error: data.error,
          };
        }
      
    }


 
 

} 