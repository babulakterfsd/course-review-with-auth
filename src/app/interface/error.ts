export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type TPopulatedCourse = {
  _id: string;
  title: string;
  instructor: string;
  categoryId: string;
  price: number;
  tags: string[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: string;
  createdBy?: string;
};
