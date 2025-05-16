export const ValidationPipeOptions: ValidationPipeOptionsInterface = {
  whitelist: true,
  transform: true,
  errorHttpStatus: 400,
  forbiddenWhiteList: true,
};

interface ValidationPipeOptionsInterface {
  whitelist: boolean;
  transform: boolean;
  errorHttpStatus: number;
  forbiddenWhiteList: boolean;
}
