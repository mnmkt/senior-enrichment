const router = require('express').Router();
const {Student, Campus} = require('../db/models');

module.exports = router;

router.get('/', function(req, res, next) {
    Campus.findAll({include: Student, order: ['id']})
        .then(campuses => res.json(campuses))
        .catch(next);
})

router.get('/:campusId', function(req, res, next) {
    Campus.findById(req.params.campusId, {include: Student})
        .then(campus => res.json(campus))
        .catch(next);
})

router.post('/', function(req, res, next) {
    Campus.create(req.body)
        .then(newCampus => res.json(newCampus))
        .catch(next)
})

router.put('/:campusId', function(req, res, next) {
    Campus.findById(req.params.campusId)
        .then(campus => campus.update(req.body))
        .then(newCampus => res.json(newCampus))
        .catch(next);
})

router.delete('/:campusId', function(req, res, next) {
    const id = req.params.campusId;

    Campus.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
})
