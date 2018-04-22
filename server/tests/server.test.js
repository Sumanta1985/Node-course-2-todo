const expect=require("expect");
const request=require("supertest");

const {app}=require("./../server");
const {Todo}=require("./../models/todo");

// beforeEach((done)=>{
//   Todo.remove({}).then(()=>done());
// });

// describe('POST /todo',()=>{
//   it('should create a new todo',(done)=>{
//     const text="test todo text";
//     // const text1="test todo text";
//
//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res)=>{
//         expect(res.body.text).toBe(text);
//       })
//       .end((err,res)=>{
//         if(err){
//           console.log('error',err);
//           return done(err);
//         }
//         Todo.find().then((todos)=>{
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e)=>done(e));
//       });
//   });
// });

describe('GET /todo',()=>{
  it('should fetch all todos',(done)=>{
    const text="Sleeptime5";
    // const text1="test todo text";

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        console.log("res.body",res.body);
        expect(res.body.todos[7].text).toBe(text);
      })
      .end(done);

  });
});
