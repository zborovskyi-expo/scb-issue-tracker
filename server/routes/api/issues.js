const router = require('express').Router();
const Issue = require('../../models/Issue');

// Get (Fetch Issues)
router.get('/', (req, res, next) => {
	Issue.find({})
		.then((issues) => {
			if (!issues || !issues.length) {
				return res.status(404).json({ message: "Issues not found" });
			}

			return res.json({ message: "Issues fetched successfully", data: issues });
		}).catch(next);
});

// Get (Fetch Issue by id)
router.get('/:id', (req, res, next) => {
	Issue.findById({ _id: req.params.id })
		.then((issue) => {
			if (!issue) {
				return res.status(404).json({ message: "Issue not found" });
			}

			return res.json({ message: "Issue fetched successfully", data: issue });
		}).catch(next);
});

// Post (Create Issue)
router.post('/', (req, res, next) => {
	const issue = new Issue();

	if (!req.body.title || typeof req.body.title === 'undefined') {
		return res.status(400).json({ message: "Bad Request" });
	}
	
	issue.title = req.body.title;
	issue.description = req.body.description;
	
	issue.save()
		.then((result) => {
			return res.json({ message: "Issue created successfully", data: result });
		})
		.catch(next);
});

// Put (Update Issue)
router.put('/:id', (req, res, next) => {
	Issue.findById(req.params.id)
		.then((issue) => {
    	if (!issue) {
				return res.status(404).json({ message: "Issue not found" });
			}

			if (typeof req.body.title !== 'undefined') {
				issue.title = req.body.title;
			}

			if (typeof req.body.desc !== 'undefined') {
				issue.desc = req.body.desc;
			}

			if (typeof req.body.status !== 'undefined') {
				if (
					(req.body.status === 'open' && (issue.status === 'pending' || issue.status === 'closed')) || 
					(req.body.status === 'pending' && issue.status === 'closed')
				) {
					return res.status(400).json({ message: "Bad Request" });
				} else {
					issue.status = req.body.status;
				}
			}

			return issue.save()
				.then((result) => {
					return res.json({ message: "Issue updated successfully",  data: result });
				})
				.catch(next);
		})
		.catch(next);
});

// DELETE (Delete Issue)
router.delete('/:id', (req, res, next) => {
	Issue.findOneAndDelete({ _id: req.params.id })
		.then((result) => {
			if (!result) {
				return res.status(404).json({ message: "Issue not found" });
			} else {
				return res.json({ message: "Issue deleted successfully" });
			}
		})
		.catch(next);
})

module.exports = router;