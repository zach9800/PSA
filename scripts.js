// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAp6Cs50J5Zdq8GSywVN1oQa9webzFJ8Go",
  authDomain: "psa-showcase-2.firebaseapp.com",
  projectId: "psa-showcase-2",
  storageBucket: "psa-showcase-2.appspot.com",
  messagingSenderId: "165758664577",
  appId: "1:165758664577:web:1a8406a63f0d7ddc4df280",
  measurementId: "G-V4L2S7CC6K"
};

firebase.initializeApp(firebaseConfig);
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
            <div id="script-${index}" class="script-box hidden" style="border-color: ${psa.color};">
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

async function savePSAToFirebase(psa) {
    try {
        await db.collection("psas").doc(psa.title).set(psa);
    } catch (error) {
        console.error("Error saving PSA:", error);
    }
}

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
        
        document.getElementById('psa-title').value = '';
        document.getElementById('psa-script').value = '';
        document.getElementById('new-psa-form').classList.add('hidden');
    }
});

function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    if (scriptDiv.classList.contains('hidden')) {
        scriptDiv.classList.remove('hidden');
        scriptDiv.style.width = "100%"; // Ensure it takes full width
        scriptDiv.style.height = "auto"; // Ensure it expands as needed
    } else {
        scriptDiv.classList.add('hidden');
    }
}

function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}

function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index].script = script;

    savePSAToFirebase(psas[index]);

    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.add('hidden');
}

function handleEnterKey(event, index) {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        const table = document.querySelector(`#script-${index} table`);
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td contenteditable="true"><strong>New Scene:</strong></td>
            <td contenteditable="true">"New script content..."</td>
        `;
        table.appendChild(newRow);
        
        showSaveButton(index);
    }
}

document.addEventListener('DOMContentLoaded', fetchPSAs);
