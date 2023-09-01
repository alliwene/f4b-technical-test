import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from "morgan";

import { errorHandlerMiddleware } from './infrastructure/common/middleware';
import { accountRouter } from './application/account/routes/accountRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))

app.use('/apiv1/account', accountRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
