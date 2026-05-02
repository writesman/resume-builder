/**
 * Resume Preview Logic
 * Fetches data from API and populates the resume view.
 * Uses Hungarian notation.
 * 
 * AI Generated: The DOM generation logic and the print styling fixes 
 * for the resume document were implemented by the Antigravity AI assistant.
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnPrintResume = document.getElementById('btnPrintResume');
    const lblResumeName = document.getElementById('lblResumeName');
    const lblResumeContact = document.getElementById('lblResumeContact');
    const lblResumeLinks = document.getElementById('lblResumeLinks');
    const divResumeJobs = document.getElementById('divResumeJobs');
    const divResumeSkills = document.getElementById('divResumeSkills');

    window.fnGenerateResumePreview = async () => {
        // Helper to get checked items from the data entry forms
        const fnGetSelectedIds = (strSelector) => {
            return Array.from(document.querySelectorAll(strSelector))
                .filter(el => el.checked)
                .map(el => parseInt(el.value));
        };

        // 1. Fetch all data and filter by user selection
        const objPersonalInfo = await objApi.fnGetPersonalInfo();
        
        let arrJobs = await objApi.fnGetJobs();
        const arrSelectedJobs = fnGetSelectedIds('.chk-include-job');
        arrJobs = arrJobs.filter(obj => arrSelectedJobs.includes(obj.intId));

        let arrSkills = await objApi.fnGetSkills();
        const arrSelectedSkills = fnGetSelectedIds('.chk-include-skill');
        arrSkills = arrSkills.filter(obj => arrSelectedSkills.includes(obj.intId));

        let arrEducation = await objApi.fnGetEducation();
        const arrSelectedEdu = fnGetSelectedIds('.chk-include-edu');
        arrEducation = arrEducation.filter(obj => arrSelectedEdu.includes(obj.intId));

        let arrCerts = await objApi.fnGetCertifications();
        const arrSelectedCerts = fnGetSelectedIds('.chk-include-cert');
        arrCerts = arrCerts.filter(obj => arrSelectedCerts.includes(obj.intId));

        let arrAwards = await objApi.fnGetAwards();
        const arrSelectedAwards = fnGetSelectedIds('.chk-include-award');
        arrAwards = arrAwards.filter(obj => arrSelectedAwards.includes(obj.intId));

        // 2. Populate Personal Info
        const sectionResumeHeader = document.getElementById('sectionResumeHeader');
        if (objPersonalInfo && objPersonalInfo.strName) {
            sectionResumeHeader.classList.remove('d-none');
            lblResumeName.textContent = objPersonalInfo.strName;
            
            const arrContact = [];
            if (objPersonalInfo.strPhone) arrContact.push(objPersonalInfo.strPhone);
            if (objPersonalInfo.strEmail) arrContact.push(objPersonalInfo.strEmail);
            if (objPersonalInfo.strAddress) arrContact.push(objPersonalInfo.strAddress);
            lblResumeContact.innerHTML = arrContact.join(' &nbsp;&bull;&nbsp; ');
            
            lblResumeLinks.textContent = objPersonalInfo.strLinks || '';
        } else {
            sectionResumeHeader.classList.add('d-none');
            lblResumeName.textContent = '';
            lblResumeContact.innerHTML = '';
            lblResumeLinks.textContent = '';
        }

        // Utility to format YYYY-MM to "Month YYYY"
        const fnFormatDate = (strDate) => {
            if (!strDate) return 'Present';
            const arrParts = strDate.split('-');
            if (arrParts.length === 2) {
                const objDate = new Date(parseInt(arrParts[0]), parseInt(arrParts[1]) - 1);
                return objDate.toLocaleString('default', { month: 'short', year: 'numeric' });
            }
            return strDate;
        };

        // 3. Populate Education
        const sectionResumeEducation = document.getElementById('sectionResumeEducation');
        const divResumeEducation = document.getElementById('divResumeEducation');
        divResumeEducation.innerHTML = '';
        if (arrEducation && arrEducation.length > 0) {
            sectionResumeEducation.classList.remove('d-none');
            arrEducation.forEach(objEdu => {
                const elEdu = document.createElement('div');
                elEdu.className = 'mb-3';
                
                let strDetailsHtml = '';
                if (objEdu.strGpa) strDetailsHtml += `<div class="mb-1"><span class="fw-bold text-body-emphasis">GPA:</span> ${objEdu.strGpa}</div>`;
                
                if (objEdu.strHonors) {
                    const arrHonors = objEdu.strHonors.split('\n').filter(h => h.trim() !== '');
                    if (arrHonors.length > 0) {
                        strDetailsHtml += `<div class="mb-1"><span class="fw-bold text-body-emphasis">Honors:</span><ul class="mb-0 mt-1">${arrHonors.map(h => `<li>${h}</li>`).join('')}</ul></div>`;
                    }
                }
                
                if (objEdu.strActivities) {
                    const arrActivities = objEdu.strActivities.split('\n').filter(a => a.trim() !== '');
                    if (arrActivities.length > 0) {
                        strDetailsHtml += `<div class="mb-1"><span class="fw-bold text-body-emphasis">Activities:</span><ul class="mb-0 mt-1">${arrActivities.map(a => `<li>${a}</li>`).join('')}</ul></div>`;
                    }
                }

                elEdu.innerHTML = `
                    <div class="d-flex justify-content-between align-items-baseline mb-1">
                        <h5 class="fw-bold mb-0 text-body-emphasis">${objEdu.strDegree}</h5>
                        <span class="text-secondary fw-bold small">${fnFormatDate(objEdu.strStartDate)} - ${fnFormatDate(objEdu.strEndDate)}</span>
                    </div>
                    <h6 class="text-secondary fst-italic mb-2">${objEdu.strSchool}</h6>
                    ${strDetailsHtml ? `<div class="small text-muted mb-0">${strDetailsHtml}</div>` : ''}
                `;
                divResumeEducation.appendChild(elEdu);
            });
        } else {
            sectionResumeEducation.classList.add('d-none');
        }

        // 4. Populate Jobs
        const sectionResumeJobs = document.getElementById('sectionResumeJobs');
        const divResumeJobs = document.getElementById('divResumeJobs');
        divResumeJobs.innerHTML = '';
        if (arrJobs && arrJobs.length > 0) {
            sectionResumeJobs.classList.remove('d-none');
            arrJobs.forEach(objJob => {
                const elJob = document.createElement('div');
                elJob.className = 'mb-4';
                
                let strResponsibilitiesHtml = '';
                if (objJob.arrResponsibilities && objJob.arrResponsibilities.length > 0) {
                    const arrLi = objJob.arrResponsibilities.map(strResp => `<li>${strResp}</li>`);
                    strResponsibilitiesHtml = `<ul class="mb-0 text-muted">${arrLi.join('')}</ul>`;
                }

                elJob.innerHTML = `
                    <div class="d-flex justify-content-between align-items-baseline mb-1">
                        <h5 class="fw-bold mb-0 text-body-emphasis">${objJob.strTitle}</h5>
                        <span class="text-secondary fw-bold small">${fnFormatDate(objJob.strStartDate)} - ${fnFormatDate(objJob.strEndDate)}</span>
                    </div>
                    <h6 class="text-secondary fst-italic mb-2">${objJob.strCompany}</h6>
                    ${strResponsibilitiesHtml}
                `;
                divResumeJobs.appendChild(elJob);
            });
        } else {
            sectionResumeJobs.classList.add('d-none');
        }

        // 4. Populate Skills (Grouped by Category)
        const sectionResumeSkills = document.getElementById('sectionResumeSkills');
        const divResumeSkills = document.getElementById('divResumeSkills');
        divResumeSkills.innerHTML = '';
        if (arrSkills && arrSkills.length > 0) {
            sectionResumeSkills.classList.remove('d-none');
            // Group skills by category
            const objGroupedSkills = {};
            arrSkills.forEach(objSkill => {
                if (!objGroupedSkills[objSkill.strCategory]) {
                    objGroupedSkills[objSkill.strCategory] = [];
                }
                objGroupedSkills[objSkill.strCategory].push(objSkill.strName);
            });

            for (const strCategory in objGroupedSkills) {
                const elSkillRow = document.createElement('div');
                elSkillRow.className = 'mb-2 text-body-emphasis';
                elSkillRow.innerHTML = `
                    <span class="fw-bold me-2 text-uppercase" style="font-size: 0.9em;">${strCategory}:</span>
                    <span>${objGroupedSkills[strCategory].join(', ')}</span>
                `;
                divResumeSkills.appendChild(elSkillRow);
            }
        } else {
            sectionResumeSkills.classList.add('d-none');
        }

        // 5. Populate Certifications
        const sectionResumeCertifications = document.getElementById('sectionResumeCertifications');
        const divResumeCertifications = document.getElementById('divResumeCertifications');
        divResumeCertifications.innerHTML = '';
        if (arrCerts && arrCerts.length > 0) {
            sectionResumeCertifications.classList.remove('d-none');
            arrCerts.forEach(objCert => {
                const elCert = document.createElement('div');
                elCert.className = 'mb-2';
                elCert.innerHTML = `
                    <div class="d-flex justify-content-between align-items-baseline mb-0">
                        <span class="fw-bold text-body-emphasis">${objCert.strName}</span>
                        <span class="text-secondary fw-bold small">${fnFormatDate(objCert.strDate)}</span>
                    </div>
                    ${objCert.strDetails ? `<div class="small text-muted">${objCert.strDetails}</div>` : ''}
                `;
                divResumeCertifications.appendChild(elCert);
            });
        } else {
            sectionResumeCertifications.classList.add('d-none');
        }

        // 6. Populate Awards
        const sectionResumeAwards = document.getElementById('sectionResumeAwards');
        const divResumeAwards = document.getElementById('divResumeAwards');
        divResumeAwards.innerHTML = '';
        if (arrAwards && arrAwards.length > 0) {
            sectionResumeAwards.classList.remove('d-none');
            arrAwards.forEach(objAward => {
                const elAward = document.createElement('div');
                elAward.className = 'mb-2';
                elAward.innerHTML = `
                    <div class="d-flex justify-content-between align-items-baseline mb-0">
                        <span class="fw-bold text-body-emphasis">${objAward.strName}</span>
                        <span class="text-secondary fw-bold small">${fnFormatDate(objAward.strDate)}</span>
                    </div>
                    ${objAward.strDetails ? `<div class="small text-muted">${objAward.strDetails}</div>` : ''}
                `;
                divResumeAwards.appendChild(elAward);
            });
        } else {
            sectionResumeAwards.classList.add('d-none');
        }
    };

    // Print Button Handler
    if (btnPrintResume) {
        btnPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    // Alternative to @media print: Use Vanilla JS to toggle Bootstrap classes right before printing
    window.addEventListener('beforeprint', () => {
        const elMainContent = document.getElementById('elMainContent');
        const elResumeDocument = document.getElementById('elResumeDocument');
        const elCardBody = elResumeDocument.querySelector('.card-body');

        // Force light mode for printing
        document.documentElement.setAttribute('data-bs-theme', 'light');

        document.body.classList.remove('bg-body-tertiary');
        document.body.classList.add('bg-body');
        
        elMainContent.classList.remove('container', 'my-5');
        elMainContent.classList.add('m-0', 'p-0', 'w-100');

        elResumeDocument.classList.remove('shadow');
        elResumeDocument.style.minHeight = 'auto'; // Prevent forcing an empty second page
        elCardBody.classList.remove('p-5');
        elCardBody.classList.add('p-0');
    });

    // Revert everything back to normal after printing is done
    window.addEventListener('afterprint', () => {
        const elMainContent = document.getElementById('elMainContent');
        const elResumeDocument = document.getElementById('elResumeDocument');
        const elCardBody = elResumeDocument.querySelector('.card-body');

        // Restore original theme
        const strSavedTheme = localStorage.getItem('strTheme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', strSavedTheme);

        document.body.classList.add('bg-body-tertiary');
        document.body.classList.remove('bg-body');
        
        elMainContent.classList.add('container', 'my-5');
        elMainContent.classList.remove('m-0', 'p-0', 'w-100');

        elResumeDocument.classList.add('shadow');
        elResumeDocument.style.minHeight = '1056px'; // Restore paper-like preview
        elCardBody.classList.add('p-5');
        elCardBody.classList.remove('p-0');
    });
});
