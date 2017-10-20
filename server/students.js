const router = require('express').Router();
const {Student, Campus} = require('../db/models');

module.exports = router;

router.get('/', function(req, res, next) {
    Student.findAll({include: Campus})
        .then(students => res.json(students))
        .catch(next);
});

router.get('/:studentId', function(req, res, next) {
    Student.findById(req.params.studentId, {include: Campus})
        .then(student => res.json(student))
        .catch(next);
})

router.post('/', function(req, res, next) {
    Student.create(req.body)
        .then(newStudent => res.json(newStudent))
        .catch(next)
})

router.put('/:studentId', function(req, res, next) {
    Student.findById(req.params.studentId)
        .then(student => student.update(req.body))
        .then(newStudent => res.json(newStudent))
        .catch(next);
})

router.delete('/:studentId', function(req, res, next) {
    const id = req.params.studentId;

    Student.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
})
