const mongoose = require('mongoose');
const User = mongoose.model('Issue');

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

mongoose.model('Issue', IssueSchema);