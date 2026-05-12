/**
 * 1. STAFF DATA
 */
const staffMembers = [
    {
        id: 1,
        name: "Hari Prasad Belbase",
        gender: "Male",
        position: "Principal",
        address: "Kapilvastu-3, Nepal",
        image: "https://i.pravatar.cc/150?u=staff1",
        phone: "9847193297",
        dob: "2035-01-10",
        bloodGroup: "B+",
        assignedClass: "" // No class assigned
    },
    {
        id: 2,
        name: "Saraswati Neupane",
        gender: "Female",
        position: "Teacher",
        address: "Gorusinghe, Nepal",
        image: "https://i.pravatar.cc/150?u=staff2",
        phone: "98470XXXXX",
        dob: "2045-05-20",
        bloodGroup: "A+",
        assignedClass: "10-A" 
    },
    {
        id: 3,
        name: "Gopal Hari",
        gender: "Male",
        position: "Teacher",
        address: "Chandrauta, Nepal",
        image: "https://i.pravatar.cc/150?u=staff3",
        phone: "98123XXXXX",
        dob: "2048-11-15",
        bloodGroup: "O+",
        assignedClass: "9-B"
    }
];

/**
 * 2. INITIALIZE POSITION FILTER
 * Automatically fills the dropdown based on unique positions in data
 */
function setupFilters() {
    const posSelect = document.getElementById('positionFilter');
    if(!posSelect) return;

    const positions = [...new Set(staffMembers.map(s => s.position))].sort();

    positions.forEach(pos => {
        const opt = document.createElement('option');
        opt.value = pos;
        opt.innerHTML = pos;
        posSelect.appendChild(opt);
    });
}

/**
 * 3. DISPLAY TABLE DATA
 */
function displayStaff(filteredData = staffMembers) {
    const tableBody = document.getElementById('staffTableBody');
    
    if (filteredData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #94a3b8;">No staff found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = filteredData.map(staff => {
        // Show assigned class in the position column if it exists
        const positionDisplay = staff.assignedClass 
            ? `${staff.position} (${staff.assignedClass})` 
            : staff.position;

        return `
        <tr>
            <td>
                <div class="student-info">
                    <img src="${staff.image}" alt="${staff.name}" class="avatar">
                    <div>
                        <div style="font-weight: 700;">${staff.name}</div>
                        <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">${staff.position}</div>
                    </div>
                </div>
            </td>
            
            <td>${staff.phone}</td>
            <td>${staff.address}</td>
            <td>
                <button class="view-btn" onclick="viewStaffProfile(${staff.id})">
                    <i class="fas fa-eye"></i> View Profile
                </button>
            </td>
        </tr>
        `;
    }).join('');
}

/**
 * 4. COMBINED FILTER LOGIC (Name + Position)
 */
function filterStaff() {
    const posVal = document.getElementById('positionFilter').value;
    const nameInput = document.getElementById('nameSearch');
    const nameVal = nameInput ? nameInput.value.toLowerCase() : "";

    const filtered = staffMembers.filter(s => {
        const matchPos = posVal === "all" || s.position === posVal;
        const matchName = s.name.toLowerCase().includes(nameVal);
        return matchPos && matchName;
    });

    displayStaff(filtered);
}

/**
 * 5. VIEW PROFILE (MODAL)
 */
function viewStaffProfile(id) {
    const staff = staffMembers.find(s => s.id === id);
    const modal = document.getElementById('profileModal');
    const content = document.getElementById('modalContent');

    if (!staff) return;

    // Assigned class row (Only shows if data is present)
    const classRow = staff.assignedClass 
        ? `<div class="detail-item"><strong>Assigned Class</strong> ${staff.assignedClass}</div>`
        : "";

    content.innerHTML = `
        <div class="profile-header">
            <img src="${staff.image}" alt="${staff.name}">
            <h2 style="margin: 10px 0 5px 0; color: var(--dark);">${staff.name}</h2>
            
            <div style="display: inline-flex; align-items: center; gap: 6px; background: var(--primary)15; color: var(--primary); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 800; margin-bottom: 20px;">
                <i class="fas fa-calendar-alt"></i> DOB: ${staff.dob}
            </div>
        </div>

        <div class="profile-details">
            <div class="detail-item"><strong>Position</strong> ${staff.position}</div>
            ${classRow}
            <div class="detail-item"><strong>Gender</strong> ${staff.gender}</div>
            <div class="detail-item"><strong>Blood Group</strong> ${staff.bloodGroup}</div>

            <div class="detail-item" style="grid-column: span 2;">
                <strong>Home Address</strong>
                <i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 5px;"></i> ${staff.address}
            </div>
        </div>
        
        <a href="tel:${staff.phone}" class="call-btn" style="display: flex; justify-content: center; margin-top: 25px; padding: 15px; font-size: 16px; width: 100%; box-sizing: border-box; text-decoration: none;">
            <i class="fas fa-phone-alt"></i> Contact Staff: ${staff.phone}
        </a>
    `;

    modal.classList.add('active');
}

/**
 * 6. MODAL UTILITIES
 */
function closeModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
}

window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target == modal) closeModal();
}

/**
 * 7. INITIAL LOAD
 */
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    displayStaff();
});