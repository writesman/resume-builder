/**
 * Main Application Logic for Resume Builder SPA
 * Implements strict Hungarian notation as requested.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnNavHome = document.getElementById('btnNavHome');
    const btnNavResume = document.getElementById('btnNavResume');
    const elSectionHome = document.getElementById('elSectionHome');
    const elSectionResume = document.getElementById('elSectionResume');

    /**
     * Hides all main sections
     */
    const fnHideAllSections = () => {
        elSectionHome.classList.add('d-none');
        elSectionResume.classList.add('d-none');
        
        btnNavHome.classList.remove('active');
        btnNavResume.classList.remove('active');
    };

    /**
     * Shows a specific section
     * @param {HTMLElement} elSection 
     * @param {HTMLElement} elNavBtn 
     */
    const fnShowSection = (elSection, elNavBtn) => {
        fnHideAllSections();
        elSection.classList.remove('d-none');
        elNavBtn.classList.add('active');
    };

    // Event Listeners for Navigation
    if (btnNavHome && elSectionHome) {
        btnNavHome.addEventListener('click', (objEvent) => {
            objEvent.preventDefault();
            fnShowSection(elSectionHome, btnNavHome);
        });
    }

    if (btnNavResume && elSectionResume) {
        btnNavResume.addEventListener('click', (objEvent) => {
            objEvent.preventDefault();
            fnShowSection(elSectionResume, btnNavResume);
        });
    }
});
