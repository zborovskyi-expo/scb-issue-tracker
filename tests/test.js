const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server');
const Issue = require('../server/models/Issue');
const apiPrefix = '/api/issues';
let id = '';

// Configure chai
chai.use(chaiHttp);
chai.should();

before(() => {
	const issue = new Issue({ title: 'Title'});
	id = issue.id;
	issue.save();
})

after(() => {
	Issue.remove({});
})

describe("Issues", () => {
	describe("GET /", () => {
		it("should get all issues record", (done) => {
			chai.request(app)
				.get(apiPrefix)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});

		it("should get a single issue record", (done) => {
			console.log(`${apiPrefix}/${id}`)
			chai.request(app)
				.get(`${apiPrefix}/${id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});
	});

	describe("POST /", () => {
		it("should create a single issue record", (done) => {
			const issue = {
				title: 'Title'
			};
			chai.request(app)
				.post(`${apiPrefix}`)
				.send(issue)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it("should not create a single issue record", (done) => {
			const issue = {
				title: ''
			};
			chai.request(app)
				.post(`${apiPrefix}`)
				.send(issue)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	describe("PUT /", () => {
		it("should update a single issue record", (done) => {
			const issue = {
				status: 'pending'
			};
			chai.request(app)
				.put(`${apiPrefix}/${id}`)
				.send(issue)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it("should not update a single issue record", (done) => {
			const issue = {
				status: 'open'
			};
			chai.request(app)
				.put(`${apiPrefix}/${id}`)
				.send(issue)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	describe("DELETE /", () => {
		it("should delete a single issue record", (done) => {
			chai.request(app)
				.delete(`${apiPrefix}/${id}`)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});