const router = require('express').Router();
const db = require('../data/dbConfig');

router.post('/', (req, res) => {
    const account = req.body;

    if(req.body.name && req.body.budget) {
        db('accounts').insert(account, 'id')
            .then(id => res.status(201).json(account))
            .catch(error => res.status(500).json({ error: "Error inserting account to DB." }))
    } else {
        res.status(400).json({ error: "Please provide a name and budget for your account." })
    }
})

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            if(accounts.length) res.status(200).json(accounts);
            res.status(404).json({ error: "There are no accounts yet." });
        })
        .catch(error => res.status(500).json({ error: "Error when getting accounts." }));
})

router.put('/:id', (req, res) => {
    const changes = req.body;

    if(changes.name && changes.budget) {
        db('accounts').where('id', '=', req.params.id).update(changes)
            .then(count => {
                if(count) res.status(202).json(count);
                res.status(404).json({ error: "Account with that ID not found." })
            })
            .catch(error => res.status(500).json({ error: "Error when updating account." }))
    } else {
        res.status(400).json({ error: "Please provide a name and budget for your account." })
    }
})

router.delete('/:id', (req, res) => {
    db('accounts').where('id', '=', req.params.id).del()
        .then(count => {
            if(count) res.status(202).json({ error: `Successfully deleted ${count} account(s).` })
            res.status(404).json({ error: "Account with that ID not found." })
        })
        .catch(error => res.status(500).json({ error: "Error when deleting account." }))
})

module.exports = router;