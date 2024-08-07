import { collection, getDocs, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Fetch PSAs from Firebase
async function fetchPSAs() {
    const querySnapshot = await getDocs(collection(db, "psas"));
    const psas = [];
    querySnapshot.forEach((doc) => {
        psas.push(doc.data());
    });
    return psas;
}

// Save PSA to Firebase
async function savePSAToFirebase(psa) {
    await setDoc(doc(db, "psas", psa.title), psa);
}

// Load and display PSAs on page load
document.addEventListener('DOMContentLoaded', async () => {
    const psas = await fetchPSAs();
    displayPSAs(psas);
});

// Handle Enter key to insert a new row
function handleEnterKey(event, index) {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        const table = document.querySelector(`#script-${index} table`);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const selectedNode = range.startContainer.nodeType === 3 ? range.startContainer.parentNode : range.startContainer;
        const currentRow = selectedNode.closest('tr');
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td contenteditable="true"><strong>New Scene:</strong></td>
            <td contenteditable="true">"New script content..."</td>
        `;
        
        currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
        
        showSaveButton(index);
    }
}

// Modify savePSA function
function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;
    const color = psas[index].color;

    const psa = { title, script, color };
    savePSAToFirebase(psa);

    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.add('hidden');
}

// Function to display PSAs
function displayPSAs(psas) {
    const psaList = document.getElementById("psa-list");
    psaList.innerHTML = "";
    
    psas.forEach((psa, index) => {
        const psaItem = document.createElement("div");
        psaItem.className = "psa-item";
        psaItem.innerHTML = `
            <h3 contenteditable="true" oninput="showSaveButton(${index})">${psa.title}</h3>
            <button onclick="toggleScript(${index})">Show/Hide Script</button>
            <div id="script-${index}" class="script-box hidden" style="border-color: ${psa.color};">
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})" onpaste="handlePaste(event)">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

// Show save button
function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}

// Toggle script visibility
function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    if (scriptDiv.classList.contains('hidden')) {
        scriptDiv.classList.remove('hidden');
    } else {
        scriptDiv.classList.add('hidden');
    }
}

// Handle paste events to ensure consistent formatting
function handlePaste(event) {
    event.preventDefault();

    const text = (event.clipboardData || window.clipboardData).getData('text');
    const sanitizedText = text.replace(/\n/g, "<br>");

    document.execCommand('insertHTML', false, sanitizedText);
}

// Add new PSA
document.getElementById('add-psa').addEventListener('click', () => {
    const newColor = colors[psas.length % colors.length]; // Rotate through colors
    const newPSA = {
        title: "New PSA Title",
        script: `
        <tr>
            <td><strong>New Scene:</strong> New Scene Title</td>
            <td>"New script content..."</td>
        </tr>
        `,
        color: newColor
    };
    psas.push(newPSA);
    displayPSAs(psas);
});
