const doc = {
  info: {
    title: 'Bank API',
    version: '1.0.0',
    description: 'API for managing bank accounts',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./application/account/routes/*.ts'];
