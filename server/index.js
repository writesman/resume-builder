const express = require('express');
const path = require('path');
const cors = require('cors');
const objDb = require('./db');

const objApp = express();
const intPort = process.env.PORT || 3000;

objApp.use(cors());
objApp.use(express.json());

// --- REST API ENDPOINTS ---

// GET Personal Info
objApp.get('/api/personal-info', (objReq, objRes) => {
    objDb.get('SELECT * FROM tblPersonalInfo LIMIT 1', [], (objErr, objRow) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(objRow || {});
    });
});

// POST/Update Personal Info
objApp.post('/api/personal-info', (objReq, objRes) => {
    const { strName, strEmail, strPhone, strAddress, strLinks } = objReq.body;
    objDb.get('SELECT intId FROM tblPersonalInfo LIMIT 1', [], (objErr, objRow) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        if (objRow) {
            objDb.run(
                'UPDATE tblPersonalInfo SET strName=?, strEmail=?, strPhone=?, strAddress=?, strLinks=? WHERE intId=?',
                [strName, strEmail, strPhone, strAddress, strLinks, objRow.intId],
                function(objUpdateErr) {
                    if (objUpdateErr) return objRes.status(500).json({ error: objUpdateErr.message });
                    objRes.json({ intId: objRow.intId, message: 'Updated successfully' });
                }
            );
        } else {
            objDb.run(
                'INSERT INTO tblPersonalInfo (strName, strEmail, strPhone, strAddress, strLinks) VALUES (?, ?, ?, ?, ?)',
                [strName, strEmail, strPhone, strAddress, strLinks],
                function(objInsertErr) {
                    if (objInsertErr) return objRes.status(500).json({ error: objInsertErr.message });
                    objRes.json({ intId: this.lastID, message: 'Inserted successfully' });
                }
            );
        }
    });
});

// GET Jobs
objApp.get('/api/jobs', (objReq, objRes) => {
    objDb.all('SELECT * FROM tblJobs', [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(arrRows);
    });
});

// POST Job
objApp.post('/api/jobs', (objReq, objRes) => {
    const { strCompany, strTitle, strStartDate, strEndDate } = objReq.body;
    objDb.run(
        'INSERT INTO tblJobs (strCompany, strTitle, strStartDate, strEndDate) VALUES (?, ?, ?, ?)',
        [strCompany, strTitle, strStartDate, strEndDate],
        function(objErr) {
            if (objErr) return objRes.status(500).json({ error: objErr.message });
            objRes.json({ intId: this.lastID });
        }
    );
});

// DELETE Job
objApp.delete('/api/jobs/:id', (objReq, objRes) => {
    objDb.run('DELETE FROM tblJobs WHERE intId = ?', objReq.params.id, function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ deleted: this.changes });
    });
});

// GET Skills
objApp.get('/api/skills', (objReq, objRes) => {
    objDb.all('SELECT * FROM tblSkills', [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(arrRows);
    });
});

// POST Skill
objApp.post('/api/skills', (objReq, objRes) => {
    const { strCategory, strName } = objReq.body;
    objDb.run('INSERT INTO tblSkills (strCategory, strName) VALUES (?, ?)', [strCategory, strName], function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ intId: this.lastID });
    });
});

// DELETE Skill
objApp.delete('/api/skills/:id', (objReq, objRes) => {
    objDb.run('DELETE FROM tblSkills WHERE intId = ?', objReq.params.id, function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ deleted: this.changes });
    });
});

// GET Certifications
objApp.get('/api/certifications', (objReq, objRes) => {
    objDb.all('SELECT * FROM tblCertifications', [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(arrRows);
    });
});

// POST Certification
objApp.post('/api/certifications', (objReq, objRes) => {
    const { strName, strDate, strDetails } = objReq.body;
    objDb.run('INSERT INTO tblCertifications (strName, strDate, strDetails) VALUES (?, ?, ?)', [strName, strDate, strDetails], function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ intId: this.lastID });
    });
});

// DELETE Certification
objApp.delete('/api/certifications/:id', (objReq, objRes) => {
    objDb.run('DELETE FROM tblCertifications WHERE intId = ?', objReq.params.id, function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ deleted: this.changes });
    });
});

// GET Awards
objApp.get('/api/awards', (objReq, objRes) => {
    objDb.all('SELECT * FROM tblAwards', [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(arrRows);
    });
});

// POST Award
objApp.post('/api/awards', (objReq, objRes) => {
    const { strName, strDate, strDetails } = objReq.body;
    objDb.run('INSERT INTO tblAwards (strName, strDate, strDetails) VALUES (?, ?, ?)', [strName, strDate, strDetails], function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ intId: this.lastID });
    });
});

// DELETE Award
objApp.delete('/api/awards/:id', (objReq, objRes) => {
    objDb.run('DELETE FROM tblAwards WHERE intId = ?', objReq.params.id, function(objErr) {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json({ deleted: this.changes });
    });
});

// Serve static files from the public directory
objApp.use(express.static(path.join(__dirname, '../public')));

// Fallback to index.html for SPA routing
objApp.get('*', (objReq, objRes) => {
    objRes.sendFile(path.join(__dirname, '../public/index.html'));
});

objApp.listen(intPort, () => {
    console.log(`Server is running on http://localhost:${intPort}`);
});
