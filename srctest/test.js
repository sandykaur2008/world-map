'use strict';
import {server} from '../server-dest/server'; 
import {expect} from 'chai'; 
import request from 'request'; 

describe('server response', () => {

  it('should return 200', (done) => {
    request.get('http://localhost:5000/auth/', (err, res) => {
      if (err) {
        console.log(err); 
      }
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe('check validation (invalid entries)', () => {

  after( () => {
    server.close();
   });

  it('contact form should be invalid', (done) => {
    request.post({
      url: 'http://localhost:5000/contact/',
      form: { comments: "hello", name: "sandy kay", email: "sk595" }}, (err, res) => {
        if (err) {
          console.log(err); 
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include('message'); 
        done(); 
    });
  }); 

  it('registration form should be invalid due to mismatching passwords', (done) => {
    request.post({
    url: 'http://localhost:5000/auth/',
    form: { username: "example", email: "example@example.com", password: "12345", password2: "123456"}}, (err, res) => {
      if (err) {
        console.log(err);
      }
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.include('message'); 
      done(); 
    }); 
  }); 
});