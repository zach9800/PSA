// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp6Cs50J5Zdq8GSywVN1oQa9webzFJ8Go",
  authDomain: "psa-showcase-2.firebaseapp.com",
  projectId: "psa-showcase-2",
  storageBucket: "psa-showcase-2.appspot.com",
  messagingSenderId: "165758664577",
  appId: "1:165758664577:web:1a8406a63f0d7ddc4df280",
  measurementId: "G-V4L2S7CC6K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const colors = ["#ff6b6b", "#6bffb6", "#6b6bff", "#ffff6b", "#ff6bff"];
let psas = [];

async function fetchPSAs() {
    try {
        const querySnapshot = await db.collection("psas").get();
        psas = querySnapshot.docs.map(doc => doc.data());
        displayPSAs();
    } catch (error) {
        console.error("Error fetching PSAs:", error);
    }
}

function displayPSAs() {
    const psaList = document.getElementById("psa-list");
    psaList.innerHTML = "";

    psas.forEach((psa, index) => {
        const psaItem = document.createElement("div");
        psaItem.className = "psa-item";
        psaItem.innerHTML = `
            <h3 contenteditable="true" oninput="showSaveButton(${index})">${psa.title}</h3>
            <button onclick="toggleScript(${index})">Show/Hide Script</button>
            <div id="overlay-${index}" class="overlay hidden"></div>
            <div id="script-${index}" class="script-box hidden" style="border-color: ${psa.color};">
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

// Handle the Enter key to create a new row in the table
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

// Toggle script visibility with fullscreen modal
function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    const overlay = document.getElementById(`overlay-${index}`);
    
    if (scriptDiv.classList.contains('hidden')) {
        scriptDiv.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else {
        scriptDiv.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

// Show save button when content is edited
function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}

// Save a PSA to Firestore
async function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index.script] = script;

    try {
        await db.collection("psas").doc(psas[index].title).set(psas[index]);
        const saveBtn = document.getElementById(`save-${index}`);
        saveBtn.classList.add('hidden');
        alert("PSA saved successfully!");
    } catch (error) {
        console.error("Error saving PSA:", error);
        alert("Failed to save PSA. Please try again.");
    }
}

// Fetch PSAs on page load
document.addEventListener('DOMContentLoaded', fetchPSAs);

