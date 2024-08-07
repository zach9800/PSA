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
const db = firebase.firestore();

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
        const psaItem = document.createElement("li");
        psaItem.className = "psa-item";
        psaItem.innerHTML = `
            <h3 contenteditable="true" oninput="showSaveButton(${index})">${psa.title}</h3>
            <button onclick="toggleScript(${index})">Show/Hide Script</button>
            <div id="script-${index}" class="script-box hidden">
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

async function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index].script = script;

    try {
        await db.collection("psas").doc(psas[index].title).set(psas[index]);
        alert("PSA saved successfully!");
        document.getElementById(`save-${index}`).classList.add('hidden');
    } catch (error) {
        console.error("Error saving PSA:", error);
        alert("Failed to save PSA. Please try again.");
    }
}

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
            `
        };

        psas.push(newPSA);
        savePSA(psas.length - 1);
        displayPSAs();
        
        document.getElementById('psa-title').value = '';
        document.getElementById('psa-script').value = '';
    }
});

document.addEventListener('DOMContentLoaded', fetchPSAs);

function handleEnterKey(event, index) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const table = document.querySelector(`#script-${index} table`);
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td contenteditable="true"><strong>New Scene:</strong></td><td contenteditable="true">New script content...</td>`;
        table.appendChild(newRow);
        showSaveButton(index);
    }
}

function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    scriptDiv.classList.toggle('hidden');
}

function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}
