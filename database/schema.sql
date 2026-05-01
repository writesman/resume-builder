CREATE TABLE IF NOT EXISTS tblPersonalInfo (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strName TEXT,
    strEmail TEXT,
    strPhone TEXT,
    strAddress TEXT,
    strLinks TEXT
);

CREATE TABLE IF NOT EXISTS tblJobs (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strCompany TEXT,
    strTitle TEXT,
    strStartDate TEXT,
    strEndDate TEXT
);

CREATE TABLE IF NOT EXISTS tblJobResponsibilities (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    intJobId INTEGER,
    strDetail TEXT,
    FOREIGN KEY (intJobId) REFERENCES tblJobs(intId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblSkills (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strCategory TEXT,
    strName TEXT
);

CREATE TABLE IF NOT EXISTS tblCertifications (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strName TEXT,
    strDate TEXT,
    strDetails TEXT
);

CREATE TABLE IF NOT EXISTS tblAwards (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strName TEXT,
    strDate TEXT,
    strDetails TEXT
);

CREATE TABLE IF NOT EXISTS tblEducation (
    intId INTEGER PRIMARY KEY AUTOINCREMENT,
    strSchool TEXT,
    strDegree TEXT,
    strStartDate TEXT,
    strEndDate TEXT,
    strGpa TEXT,
    strHonors TEXT,
    strActivities TEXT
);
