//MOCK DATA FOR DOCKER Mongo test database

db = db.getSiblingDB('development');
// add user to this database must match values in .env file for MONGO_* values
db.createUser({
  user: 'development',
  pwd: 'dCGMOrztFFtwoxht', // or cleartext password
  roles: [{ role: 'readWrite', db: 'development' }]
});

//Server for ssh testing
db.instances.drop();
db.createCollection('instances');
db.instances.insertMany([
  {
    shortname: 'dev',
    stackname: 'dev-us-east-1-default-docker',
    alias_shortname: 'real-dev',
    username: 'root',
    ip: 'backend-docker',
    private_ip: 'backend-docker'
  }
]);

//Portal user access
db.users.drop();
db.createCollection('users');
db.users.insertMany([
  {
    roles: ['admin', 'content', 'server', 'user'],
    username: 'awint',
    password: '$2b$10$UUQnLrI4lYz8jwIEozdN/ezyQH4lBptcXNMqBHaZyCXqK2yf0I0py',
    first_name: 'Andrew',
    last_name: 'Wint',
    email: 'awint@truechoicesolutions.com',
    salt: '$2b$10$UUQnLrI4lYz8jwIEozdN/e',
    apikey: '$2b$10$UUQnLrI4lYz8jwIEozdN/e9IhnP1oHyGbhjXhWfFYjBewzC2npgd.'
  }
]);
