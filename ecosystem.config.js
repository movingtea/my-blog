// script for start nextjs app with pm2

module.exports = {
    apps: [
        {
            name: 'blog',
            script: 'npm',
            args: 'start',
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development'
            }
        }
    ]
}