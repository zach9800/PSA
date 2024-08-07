// Define an array of colors to use for PSAs
const colors = ["#ff6b6b", "#6bffb6", "#6b6bff", "#ffff6b", "#ff6bff"];

// Initialize an array for PSAs
let psas = [];

// Function to fetch PSAs from Firestore
async function fetchPSAs() {
    try {
        const querySnapshot = await db.collection("psas").get();
        querySnapshot.forEach((doc) => {
            psas.push(doc.data());
        });
        displayPSAs();
    } catch (error) {
        console.error("Error fetching PSAs:", error);
    }
}

// Function to display PSAs
function displayPSAs() {
    const psaList = document.getElementById("psa-list");
    psaList.innerHTML = "";

    psas.forEach((psa, index) => {
        const psaItem = document.createElement("div");
        psaItem.className = "psa-item";
        psaItem.innerHTML = `
            <h3 contenteditable="true" oninput="showSaveButton(${index})">${psa.title}</h3>
            <button onclick="toggleScript(${index})">Show/Hide Script</button>
            <div id="script-${index}" class="script-box hidden" style="border-color: ${psa.color};">
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

// Function to save a PSA to Firestore
async function savePSAToFirebase(psa) {
    try {
        await db.collection("psas").doc(psa.title).set(psa);
    } catch (error) {
        console.error("Error saving PSA:", error);
    }
}

// Handle adding a new PSA
document.getElementById('add-psa').addEventListener('click', () => {
    document.getElementById('new-psa-form').classList.toggle('hidden');
});

document.getElementById('save-new-psa').addEventListener('click', () => {
    const title = document.getElementById('psa-title').value;
    const script = document.getElementById('psa-script').value;

    if (title && script) {
        const newPSA = {
            title: title,
            script: `
            <tr>
                <td><strong>Scene 1:</strong> ${title}</td>
                <td>${script}</td>
            </tr>
            `,
            color: colors[psas.length % colors.length]
        };

        psas.push(newPSA);
        savePSAToFirebase(newPSA);
        displayPSAs();
        
        // Clear form fields
        document.getElementById('psa-title').value = '';
        document.getElementById('psa-script').value = '';
        document.getElementById('new-psa-form').classList.add('hidden');
    }
});

// Function to toggle script visibility
function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    if (scriptDiv.classList.contains('hidden')) {
        scriptDiv.classList.remove('hidden');
    } else {
        scriptDiv.classList.add('hidden');
    }
}

// Function to show save button when content is edited
function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}

// Function to save PSA content when edited
function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index].script = script;

    savePSAToFirebase(psas[index]);

    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.add('hidden');
}

// Load and display PSAs on page load
document.addEventListener('DOMContentLoaded', fetchPSAs);
