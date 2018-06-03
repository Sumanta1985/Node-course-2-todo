const expect=require("expect");
const request=require("supertest");

const {app}=require("./../server");
const {Todo}=require("./../models/todo");
const {ObjectId}=require("mongodb");
const {todos,populateTodos,users,populateUsers}=require("./seed/seed.js");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todo',()=>{
  it('should create a new todo',(done)=>{
    const text="test todo text";
    // const text1="test todo text";
    request(app)
      .post('/todos')
      .send({text})
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          console.log('error',err);
          return done(err);
        }
        Todo.find().then((todos)=>{
//          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe('first');
          done();
        }).catch((e)=>done(e));
      });
  });
});

describe('GET /todo',()=>{
  it('should fetch all todos',(done)=>{
    const text="first";
    // const text1="test todo text";

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
//        console.log("res.body",res.body);
        expect(res.body.todos[0].text).toBe(text);
      })
      .end(done);

  });
});

describe('GET /todo/:id',()=>{
  var _id=new ObjectId();
  it('should validate id,if not able to find then send 404',(done)=>{
    request(app)
      .get(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todo/:id',()=>{
  var _id=new ObjectId();
  it('should delete todo',(done)=>{
    request(app)
      .delete(`/todos/${todos[0]._id}`)
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .end(done);
// below not working with with expect version
      // .end((err,res)=>{
      //   if (err){
      //     return done(err);
      //   }
      //   Todo.findById(_id).then((todo)=>{
      //     expect(todo).toNotExist();
      //     done();
      //   }).catch((e)=>{
      //     done(e);
      //   });
      // });
  });
  it('should send 404',(done)=>{
    request(app)
      .delete(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todo/:id',()=>{
  var _id=new ObjectId();
  var text="This should be new text";

  it('should update todo',(done)=>{
    request(app)
      .patch(`/todos/${todos[0]._id}`)
      .set('x-auth',users[0].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end(done);
  });

  it('should send 404',(done)=>{
    request(app)
      .patch(`/todos/${_id.toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('POST /user',()=>{
  it('should create a new user',(done)=>{
    request(app)
    .post('/users')
    .send({
      _id: new ObjectId,
      name: 'sumanta',
      email:'bardhan.sumanta@yahoo.com',
      password:'123abc'
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe('bardhan.sumanta@yahoo.com');
//      expect(res.body._id).toExist();
//      expect(res.headers['x-auth']).toExist();
    })
    .end(done)
  });
});

describe('GET /user/me',()=>{
  it('should get a user',(done)=>{
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)    //to set header
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe('bardhan.sumanta@gmail.com');
    })
    .end(done)
  })

  it('should return 401 if not authenticated',()=>{
    it('should get a user',(done)=>{
      request(app)
      .get('/users/me')
      .set('x-auth',users[1].tokens[0].token)
      .expect(401)
      .expect((res)=>{
        expect(res.body).toEqual({});  //to match objects use toEqual method instead to Be
      })
      .end(done)
    })
  })
});
