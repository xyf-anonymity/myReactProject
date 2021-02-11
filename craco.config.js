const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1488c8' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// #1ca579