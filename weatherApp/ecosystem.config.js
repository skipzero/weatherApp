module.exports = {
  apps : [{
    name: 'weather',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    development : {
      user : 'weatheruser',
      host : '165.227.22.152',
      ref  : 'origin/master',
      repo : 'git@github.com:skipzero/weatherApp.git',
      path : '/var/www/weatherApp',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development'
    },
    production : {
      user : 'weatheruser',
      host : '165.227.22.152',
      ref  : 'origin/master',
      repo : 'git@github.com:skipzero/weatherApp.git',
      path : '/var/www/weatherApp',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
