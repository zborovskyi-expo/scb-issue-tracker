const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['open', 'pending', 'closed'],
		default: 'open'
	}
});

const Issue = module.exports = mongoose.model('Issue', IssueSchema);