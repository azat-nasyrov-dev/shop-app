const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  db: {
    url: 'mongodb://localhost/shop',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  facebook: {
    appId: '3088835851354539',
    appSecret: '5948f79945c2a6e128e393e9d5353486'
  }
};