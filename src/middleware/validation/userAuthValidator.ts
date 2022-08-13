import express, {
  Express,
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import {
  signUpUserDataValidationSchema,
  LogInUserDataValidationSchema,
  EditUserEmailValidationSchema,
  EditUserPasswordValidationSchema,
  DeleteUserDataValidationSchema,
} from "./authValidationSchema";

import asyncHandler from "../../handlers/asyncHandler";

import ErrorHandler from "../custom/modifiedErrorHandler";

const validationOptions = {
  abortEarly: false,
  cache: false,
  // Must study this convert option to to date issues
  convert: true,
  debug: true,
  warnings: true,
};

const signUpUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedSignUpUserData } = res.locals;

      await signUpUserDataValidationSchema
        .validateAsync(sanitizedSignUpUserData, validationOptions)
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedSignUpUserData = { ...value };

          delete res.locals.sanitizedSignUpUserData;
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const logInUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedLogInUserData } = res.locals;

      await LogInUserDataValidationSchema.validateAsync(
        sanitizedLogInUserData,
        validationOptions
      )
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedLogInUserData = { ...value };
          delete res.locals.sanitizedLogInUserData;
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const updateUserEmailValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedEditUserEmail } = res.locals;

      await EditUserEmailValidationSchema.validateAsync(
        sanitizedEditUserEmail,
        validationOptions
      )
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedEditUserEmail = { ...value };
          delete res.locals.sanitizedEditUserEmail;
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const updateUserPasswordValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedEditUserPassword } = res.locals;

      await EditUserPasswordValidationSchema.validateAsync(
        sanitizedEditUserPassword,
        validationOptions
      )
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedEditUserPassword = { ...value };
          delete res.locals.sanitizedEditUserEmail;
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

const deleteUserDataValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sanitizedDeleteUserData } = res.locals;

      await DeleteUserDataValidationSchema.validateAsync(
        sanitizedDeleteUserData,
        validationOptions
      )
        .then(({ value, warning, debug }: any) => {
          res.locals.validatedDeleteUserData = { ...value };
          delete res.locals.sanitizedLogInUserData;
          return next();
        })
        .catch((error: any) => {
          throw new ErrorHandler(
            409,
            "There seems to be something wrong with the following fields",
            error.details.map((err: any) => {
              return err;
            })
          );
        });
    } catch (error: any) {
      throw new ErrorHandler(error?.status, error?.message, error?.payload);
    }
  }
) as RequestHandler;

//   const deleteUserDataValidator = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const { sanitizedDeleteUserData } = res.locals;

//         await DeleteUserDataValidationSchema.validateAsync(
//           sanitizedDeleteUserData,
//           validationOptions
//         )
//           .then(({ value, warning, debug }: any) => {
//             res.locals.validatedDeleteUserData = { ...value };
//             delete res.locals.sanitizedDeleteUserData;
//             return next();
//           })
//           .catch((error: any) => {
//             throw new ErrorHandler(
//               409,
//               "There seems to be something wrong with the following fields",
//               error.details.map((err: any) => {
//                 return err;
//               })
//             );
//           });
//       } catch (error: any) {
//         throw new ErrorHandler(error?.status, error?.message, error?.payload);
//       }
//     }
//   ) as RequestHandler;

export {
  signUpUserDataValidator,
  logInUserDataValidator,
  updateUserEmailValidator,
  updateUserPasswordValidator,
  deleteUserDataValidator,
};
