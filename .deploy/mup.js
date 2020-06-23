module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '3.22.2.66',
      username: 'ubuntu',
      pem: './.secret/phly-grace.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'phly',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://www.phly.co',
      MONGO_URL: 'mongodb+srv://glanconetani:xetorca20@clusterphly-uc0tc.mongodb.net/test?retryWrites=true&w=majority',
      MAIL_URL: "smtp://hello@phly.co:phi1@nthropy@smtp.porkbun.com:587"
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },


  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    domains: 'www.phly.co,phly.co',

    ssl: {
     // Enable Let's Encrypt
     forceSSL: true,
     letsEncryptEmail: 'hello@phly.co'
    }
  }
};
