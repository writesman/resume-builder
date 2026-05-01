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
    const strSql = `
        SELECT j.*, GROUP_CONCAT(r.strDetail, '|||') as strResponsibilities
        FROM tblJobs j
        LEFT JOIN tblJobResponsibilities r ON j.intId = r.intJobId
        GROUP BY j.intId
    `;
    objDb.all(strSql, [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        
        // Map the concatenated string back into an array
        arrRows.forEach(objRow => {
            objRow.arrResponsibilities = objRow.strResponsibilities ? objRow.strResponsibilities.split('|||') : [];
            delete objRow.strResponsibilities;
        });
        
        objRes.json(arrRows);
    });
});

// POST Job
objApp.post('/api/jobs', (objReq, objRes) => {
    const { strCompany, strTitle, strStartDate, strEndDate, strResponsibilities } = objReq.body;
    objDb.run(
        'INSERT INTO tblJobs (strCompany, strTitle, strStartDate, strEndDate) VALUES (?, ?, ?, ?)',
        [strCompany, strTitle, strStartDate, strEndDate],
        function(objErr) {
            if (objErr) return objRes.status(500).json({ error: objErr.message });
            
            const intJobId = this.lastID;
            
            // If responsibilities were provided, insert them into the child table
            if (strResponsibilities && strResponsibilities.trim() !== '') {
                const arrResp = strResponsibilities.split('\n').filter(r => r.trim() !== '');
                if (arrResp.length > 0) {
                    const arrPlaceholders = arrResp.map(() => '(?, ?)').join(', ');
                    const arrValues = [];
                    arrResp.forEach(r => {
                        arrValues.push(intJobId, r.trim());
                    });
                    
                    objDb.run(
                        `INSERT INTO tblJobResponsibilities (intJobId, strDetail) VALUES ${arrPlaceholders}`,
                        arrValues,
                        function(objRespErr) {
                            if (objRespErr) return objRes.status(500).json({ error: objRespErr.message });
                            objRes.json({ intId: intJobId });
                        }
                    );
                    return;
                }
            }
            
            objRes.json({ intId: intJobId });
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

// GET Education
objApp.get('/api/education', (objReq, objRes) => {
    objDb.all('SELECT * FROM tblEducation', [], (objErr, arrRows) => {
        if (objErr) return objRes.status(500).json({ error: objErr.message });
        objRes.json(arrRows);
    });
});

// POST Education
objApp.post('/api/education', (objReq, objRes) => {
    const { strSchool, strDegree, strStartDate, strEndDate, strGpa, strHonors, strActivities } = objReq.body;
    objDb.run(
        'INSERT INTO tblEducation (strSchool, strDegree, strStartDate, strEndDate, strGpa, strHonors, strActivities) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [strSchool, strDegree, strStartDate, strEndDate, strGpa, strHonors, strActivities], 
        function(objErr) {
            if (objErr) return objRes.status(500).json({ error: objErr.message });
            objRes.json({ intId: this.lastID });
        }
    );
});

// DELETE Education
objApp.delete('/api/education/:id', (objReq, objRes) => {
    objDb.run('DELETE FROM tblEducation WHERE intId = ?', objReq.params.id, function(objErr) {
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
