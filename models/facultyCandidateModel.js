const mongoose = require('mongoose');

const facultyCandidateModel = new mongoose.Schema({
    candidateInfos: {
        type: mongoose.Schema.ObjectId,
        ref:'DepartmentRef',
    },
    voteCount: {
        type: Number,
        default: 0,
    },
});

const FacultyCandidate = mongoose.model('FacultyCandidate', facultyCandidateModel);

module.exports = FacultyCandidate;