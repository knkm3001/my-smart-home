const user = {
  user: 'user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'my-smart-room'
  }]
};

db.createUser(user);