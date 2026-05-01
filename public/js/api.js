/**
 * API Helper Functions for interacting with the Express backend
 * Uses Hungarian notation for all variables.
 */

const strBaseUrl = '/api';

const objApi = {
    // --- Personal Info ---
    fnGetPersonalInfo: async () => {
        const objResponse = await fetch(`${strBaseUrl}/personal-info`);
        return objResponse.json();
    },
    fnSavePersonalInfo: async (objData) => {
        const objResponse = await fetch(`${strBaseUrl}/personal-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objData)
        });
        return objResponse.json();
    },

    // --- Jobs ---
    fnGetJobs: async () => {
        const objResponse = await fetch(`${strBaseUrl}/jobs`);
        return objResponse.json();
    },
    fnSaveJob: async (objData) => {
        const objResponse = await fetch(`${strBaseUrl}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objData)
        });
        return objResponse.json();
    },
    fnDeleteJob: async (intId) => {
        const objResponse = await fetch(`${strBaseUrl}/jobs/${intId}`, { method: 'DELETE' });
        return objResponse.json();
    },

    // --- Skills ---
    fnGetSkills: async () => {
        const objResponse = await fetch(`${strBaseUrl}/skills`);
        return objResponse.json();
    },
    fnSaveSkill: async (objData) => {
        const objResponse = await fetch(`${strBaseUrl}/skills`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objData)
        });
        return objResponse.json();
    },
    fnDeleteSkill: async (intId) => {
        const objResponse = await fetch(`${strBaseUrl}/skills/${intId}`, { method: 'DELETE' });
        return objResponse.json();
    }
};
