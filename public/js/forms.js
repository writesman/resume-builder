/**
 * Forms and Data Entry Logic
 * Uses Hungarian notation for DOM elements and variables.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Personal Info Elements
    const formPersonalInfo = document.getElementById('formPersonalInfo');
    const txtName = document.getElementById('txtName');
    const txtEmail = document.getElementById('txtEmail');
    const txtPhone = document.getElementById('txtPhone');
    const txtAddress = document.getElementById('txtAddress');
    const txtLinks = document.getElementById('txtLinks');
    const btnSavePersonalInfo = document.getElementById('btnSavePersonalInfo');

    // Load Initial Data
    const fnLoadData = async () => {
        // Load Personal Info
        const objPersonalInfo = await objApi.fnGetPersonalInfo();
        if (objPersonalInfo && objPersonalInfo.intId) {
            txtName.value = objPersonalInfo.strName || '';
            txtEmail.value = objPersonalInfo.strEmail || '';
            txtPhone.value = objPersonalInfo.strPhone || '';
            txtAddress.value = objPersonalInfo.strAddress || '';
            txtLinks.value = objPersonalInfo.strLinks || '';
        }
        
        fnLoadJobs();
        fnLoadSkills();
        fnLoadEducation();
    };

    // Personal Info Submit
    if (formPersonalInfo) {
        formPersonalInfo.addEventListener('submit', async (objEvent) => {
            objEvent.preventDefault();
            btnSavePersonalInfo.disabled = true;
            btnSavePersonalInfo.textContent = 'Saving...';
            
            const objData = {
                strName: txtName.value,
                strEmail: txtEmail.value,
                strPhone: txtPhone.value,
                strAddress: txtAddress.value,
                strLinks: txtLinks.value
            };
            
            await objApi.fnSavePersonalInfo(objData);
            
            btnSavePersonalInfo.disabled = false;
            btnSavePersonalInfo.textContent = 'Saved!';
            setTimeout(() => { btnSavePersonalInfo.textContent = 'Save Personal Info'; }, 2000);
        });
    }

    // --- Jobs ---
    const formJob = document.getElementById('formJob');
    const divJobList = document.getElementById('divJobList');

    // --- Date Formatter ---
    const fnFormatDate = (strDate) => {
        if (!strDate) return 'Present';
        const arrParts = strDate.split('-');
        if (arrParts.length === 2) {
            const objDate = new Date(parseInt(arrParts[0]), parseInt(arrParts[1]) - 1);
            return objDate.toLocaleString('default', { month: 'short', year: 'numeric' });
        }
        return strDate;
    };

    const fnLoadJobs = async () => {
        if (!divJobList) return;
        const arrJobs = await objApi.fnGetJobs();
        divJobList.innerHTML = '';
        arrJobs.forEach(objJob => {
            const elJob = document.createElement('div');
            elJob.className = 'list-group-item d-flex justify-content-between align-items-center';
            elJob.innerHTML = `
                <div>
                    <h3 class="h6 mb-0 fw-bold">${objJob.strTitle} <span class="fw-normal text-dark">at ${objJob.strCompany}</span></h3>
                    <small class="text-dark">${fnFormatDate(objJob.strStartDate)} - ${fnFormatDate(objJob.strEndDate)}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger btnDeleteJob" data-id="${objJob.intId}">Remove</button>
            `;
            divJobList.appendChild(elJob);
        });

        // Attach delete events
        document.querySelectorAll('.btnDeleteJob').forEach(btn => {
            btn.addEventListener('click', async (objEvent) => {
                const intId = objEvent.target.getAttribute('data-id');
                await objApi.fnDeleteJob(intId);
                fnLoadJobs(); // refresh list
            });
        });
    };

    if (formJob) {
        formJob.addEventListener('submit', async (objEvent) => {
            objEvent.preventDefault();
            const objData = {
                strCompany: document.getElementById('txtJobCompany').value,
                strTitle: document.getElementById('txtJobTitle').value,
                strStartDate: document.getElementById('txtJobStart').value,
                strEndDate: document.getElementById('txtJobEnd').value,
                strResponsibilities: document.getElementById('txtJobResponsibilities').value
            };
            await objApi.fnSaveJob(objData);
            formJob.reset();
            fnLoadJobs();
        });
    }

    // --- Education ---
    const formEducation = document.getElementById('formEducation');
    const divEducationList = document.getElementById('divEducationList');

    const fnLoadEducation = async () => {
        if (!divEducationList) return;
        const arrEdu = await objApi.fnGetEducation();
        divEducationList.innerHTML = '';
        arrEdu.forEach(objEdu => {
            const elEdu = document.createElement('div');
            elEdu.className = 'list-group-item d-flex justify-content-between align-items-center';
            elEdu.innerHTML = `
                <div>
                    <h3 class="h6 mb-0 fw-bold">${objEdu.strDegree} <span class="fw-normal text-dark">at ${objEdu.strSchool}</span></h3>
                    <small class="text-dark">${fnFormatDate(objEdu.strStartDate)} - ${fnFormatDate(objEdu.strEndDate)}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger btnDeleteEducation" data-id="${objEdu.intId}">Remove</button>
            `;
            divEducationList.appendChild(elEdu);
        });

        // Attach delete events
        document.querySelectorAll('.btnDeleteEducation').forEach(btn => {
            btn.addEventListener('click', async (objEvent) => {
                const intId = objEvent.target.getAttribute('data-id');
                await objApi.fnDeleteEducation(intId);
                fnLoadEducation();
            });
        });
    };

    if (formEducation) {
        formEducation.addEventListener('submit', async (objEvent) => {
            objEvent.preventDefault();
            const objData = {
                strSchool: document.getElementById('txtEduSchool').value,
                strDegree: document.getElementById('txtEduDegree').value,
                strStartDate: document.getElementById('txtEduStart').value,
                strEndDate: document.getElementById('txtEduEnd').value,
                strGpa: document.getElementById('txtEduGpa').value,
                strHonors: document.getElementById('txtEduHonors').value,
                strActivities: document.getElementById('txtEduActivities').value
            };
            await objApi.fnSaveEducation(objData);
            formEducation.reset();
            fnLoadEducation();
        });
    }

    // --- Skills ---
    const formSkill = document.getElementById('formSkill');
    const divSkillList = document.getElementById('divSkillList');

    const fnLoadSkills = async () => {
        if (!divSkillList) return;
        const arrSkills = await objApi.fnGetSkills();
        divSkillList.innerHTML = '';
        arrSkills.forEach(objSkill => {
            const elSkill = document.createElement('span');
            elSkill.className = 'badge bg-primary me-2 p-2 mb-2 d-inline-flex align-items-center rounded-pill';
            elSkill.innerHTML = `
                <span class="fw-normal me-1">${objSkill.strCategory}:</span> ${objSkill.strName}
                <button type="button" class="btn-close btn-close-white ms-2 btnDeleteSkill" style="font-size: 0.5rem;" aria-label="Remove Skill" data-id="${objSkill.intId}"></button>
            `;
            divSkillList.appendChild(elSkill);
        });

        document.querySelectorAll('.btnDeleteSkill').forEach(btn => {
            btn.addEventListener('click', async (objEvent) => {
                const intId = objEvent.target.getAttribute('data-id');
                await objApi.fnDeleteSkill(intId);
                fnLoadSkills();
            });
        });
    };

    if (formSkill) {
        formSkill.addEventListener('submit', async (objEvent) => {
            objEvent.preventDefault();
            const objData = {
                strCategory: document.getElementById('txtSkillCategory').value,
                strName: document.getElementById('txtSkillName').value
            };
            await objApi.fnSaveSkill(objData);
            formSkill.reset();
            fnLoadSkills();
        });
    }

    // --- Settings (API Key) ---
    const txtGeminiKey = document.getElementById('txtGeminiKey');
    const btnSaveSettings = document.getElementById('btnSaveSettings');
    
    if (txtGeminiKey && btnSaveSettings) {
        // Load saved key on init
        const strSavedKey = localStorage.getItem('strGeminiKey');
        if (strSavedKey) {
            txtGeminiKey.value = strSavedKey;
        }

        btnSaveSettings.addEventListener('click', () => {
            localStorage.setItem('strGeminiKey', txtGeminiKey.value.trim());
            btnSaveSettings.textContent = 'Saved!';
            setTimeout(() => { btnSaveSettings.textContent = 'Save Settings'; }, 2000);
        });
    }

    // --- AI Enhance Handlers ---
    const fnHandleEnhance = async (strBtnId, strInputId, strContext) => {
        const btn = document.getElementById(strBtnId);
        const input = document.getElementById(strInputId);
        if (!btn || !input) return;

        btn.addEventListener('click', async () => {
            const strText = input.value.trim();
            if (!strText) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hold up!',
                    text: 'Please enter some text to enhance first.'
                });
                return;
            }

            const strApiKey = localStorage.getItem('strGeminiKey');
            if (!strApiKey) {
                Swal.fire({
                    icon: 'info',
                    title: 'API Key Required',
                    text: 'Please configure your Gemini API Key in the Settings tab first.'
                });
                return;
            }

            const strOriginalText = btn.textContent;
            btn.textContent = '✨ Working...';
            btn.disabled = true;

            try {
                const strEnhanced = await objApi.fnEnhanceText(strText, strContext, strApiKey);
                input.value = strEnhanced;
            } catch (objErr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Enhancement Failed',
                    text: objErr.message
                });
            } finally {
                btn.textContent = strOriginalText;
                btn.disabled = false;
            }
        });
    };

    fnHandleEnhance('btnAiResponsibilities', 'txtJobResponsibilities', 'job');
    fnHandleEnhance('btnAiHonors', 'txtEduHonors', 'honors');
    fnHandleEnhance('btnAiActivities', 'txtEduActivities', 'activities');

    // Initialize Page
    fnLoadData();
});
