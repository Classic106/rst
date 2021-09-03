const app  = require('../app');
const mongoose = require("mongoose");
const request = require('supertest');

//jest.setTimeout(20000);
//const { assert, expect, should } = require('chai');

let obj = {};

beforeAll(done => {
  done();
});

afterAll(done => {
  mongoose.connection.close();
  done();
});

describe('GET /searchItems', function() {

    it('GET /searchItems', function(done) {
        request(app)
            .get('/searchItems')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

describe('CHECK /users', function() {

    it('GET /users without authorization', function(done) {
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(
                function(err, res) {
                    if (err) return done(err);
                    return done();
            })
    });

    it('POST /users/auth with right body', function(done) {

        request(app)
            .post('/users/auth')
            .send({
                login: 'test@test.test',
                password: 'test'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(
                function(err, res) {
                    obj.token = res.headers.authorization;
                    obj.user = res.body;
                    if (err) return done(err);
                    return done();
            })
    });

    it('GET /users/auth with right authorization', function(done) {
        //console.log(token);
        request(app)
            .get('/users/auth')
            .set('Authorization', obj.token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(
                function(err, res) {
                    //token = res.headers.authorization;
                    if (err) return done(err);
                    return done();
            })
    });

    it('POST /users/auth without body', function(done) {

        request(app)
            .post('/users/auth')
            .expect(403)
            .end(
                function(err, res) {
                    //token = res.headers.authorization;
                    if (err) return done(err);
                    return done();
            })
    });

    it('GET /users/auth wihout authorization', function(done) {
        request(app)
            .get('/users/auth')
            .expect(403)
            .end(
                function(err, res) {
                    //console.log(res.data);
                    console.log(obj);
                    if (err) return done(err);
                    return done();
            })
    });

    /*it(`DELETE /users with rigth id`, function(done) {

        request(app)
            .delete(`/users/${obj.user._id}`)
            .set('Authorization', obj.token)
            .expect(200)
            .end(
                function(err, res) {
                    //console.log(res.body);
                    if (err) return done(err);
                    return done();
            })
    });*/

    it('POST /user/reg with wrong body', function(done) {
        request(app)
            .post('/users/reg')
            .send({
                email: 'test@test.test',
                password: 'test'
            })
            .expect(402)
            .end(
                function(err, res) {
                    if (err) return done(err);
                    return done();
            })
    });

    it('POST /user/reg with right body', function(done) {
        request(app)
            .post('/users/reg')
            .send({
                email: 'test@test.test',
                login: 'test',
                password: 'test'
            })
            .expect(401)
            .end(
                function(err, res) {
                    if (err) return done(err);
                    return done();
            })
    });

    it('POST /user/check with wrong email', function(done) {
        request(app)
            .post('/users/check')
            .send({
                email: 'test@test.test',
                login: 'test',
            })
            .expect(200)
            .end(
                function(err, res) {
                    if (err) return done(err);
                    return done();
            })
    });
});

//612a915aaba8b44e1cc666a0
