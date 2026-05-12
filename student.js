

/**
 * 2. INITIALIZE FILTERS
 */
function setupFilters() {
    const classSelect = document.getElementById('classFilter');
    const sectionSelect = document.getElementById('sectionFilter');

    if(!classSelect || !sectionSelect) return;

    // Get unique values for dropdowns
    const classes = [...new Set(students.map(s => s.class))].sort((a, b) => a - b);
    const sections = [...new Set(students.map(s => s.section))].sort();

    classes.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls;
        opt.innerHTML = `Class ${cls}`;
        classSelect.appendChild(opt);
    });

    sections.forEach(sec => {
        const opt = document.createElement('option');
        opt.value = sec;
        opt.innerHTML = `Section ${sec}`;
        sectionSelect.appendChild(opt);
    });
}

/**
 * 3. DISPLAY TABLE DATA
 */
function displayStudents(filteredData = students) {
    const tableBody = document.getElementById('studentTableBody');
    
    if (filteredData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #94a3b8;">No records found matching these filters.</td></tr>`;
        return;
    }

    tableBody.innerHTML = filteredData.map(student => `
        <tr>
            <td>
                <div class="student-info">
                    <img src="${student.image}" alt="${student.name}" class="avatar">
                    <div>
                        <div style="font-weight: 700;">${student.name}</div>
                        <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">${student.dob}</div>
                    </div>
                </div>
            </td>
            <td>${student.class}</td>
            <td>${student.section}</td>
            <td>${student.address}</td>
            <td>
                <button class="view-btn" onclick="viewProfile(${student.id})">
                    <i class="fas fa-eye"></i> View Profile
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * 4. FILTER LOGIC
 */
function filterStudents() {
    const classVal = document.getElementById('classFilter').value;
    const sectionVal = document.getElementById('sectionFilter').value;

    const filtered = students.filter(s => {
        const matchClass = classVal === "all" || s.class === classVal;
        const matchSection = sectionVal === "all" || s.section === sectionVal;
        return matchClass && matchSection;
    });

    displayStudents(filtered);
}

/**
 * 5. VIEW PROFILE (MODAL)
 */
function viewProfile(id) {
    const student = students.find(s => s.id === id);
    const modal = document.getElementById('profileModal');
    const content = document.getElementById('modalContent');

    if (!student) return;

    content.innerHTML = `
        <div class="profile-header">
            <img src="${student.image}" alt="${student.name}">
            <h2 style="margin: 10px 0 5px 0; color: var(--dark);">${student.name}</h2>
            
            <!-- DOB Badge Highlight -->
            <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--primary)15; color: var(--primary); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 800; margin-bottom: 10px;">
                <i class="fas fa-calendar-alt"></i> DOB: ${student.dob}
            </div>

            <p style="color: #64748b; font-weight: 600; margin-bottom: 20px;">Roll No: ${student.rollNo}</p>
        </div>

        <div class="profile-details">
            <div class="detail-item"><strong>Class</strong> ${student.class}</div>
            <div class="detail-item"><strong>Section</strong> ${student.section}</div>
            <div class="detail-item"><strong>Parent's Name</strong> ${student.parentName}</div>
            <div class="detail-item"><strong>Blood Group</strong> ${student.bloodGroup}</div>
            <div class="detail-item"><strong>Gender</strong> ${student.gender}</div>
          

            <div class="detail-item" style="grid-column: span 2;">
                <strong>Home Address</strong>
                <i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 5px;"></i> ${student.address}
            </div>
        </div>
        
        <a href="tel:${student.phone}" class="call-btn" style="display: flex; justify-content: center; margin-top: 25px; padding: 15px; font-size: 16px; width: 100%; box-sizing: border-box;">
            <i class="fas fa-phone-alt"></i> Call Parent: ${student.phone}
        </a>
    `;

    modal.classList.add('active');
}

/**
 * 6. MODAL UTILITIES
 */
function closeModal() {
    document.getElementById('profileModal').classList.remove('active');
}

// Close on outside click
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target == modal) {
        closeModal();
    }
}

/**
 * 7. INITIAL LOAD
 */
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    displayStudents();
});