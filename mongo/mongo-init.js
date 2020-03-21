const user = {
  user: 'user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'myroom_data'
  }]
};

db.createUser(user);