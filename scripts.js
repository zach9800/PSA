import { collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Define an array of colors to use for PSAs
const colors = ["#ff6b6b", "#6bffb6", "#6b6bff", "#ffff6b", "#ff6bff"];

// Initialize default PSAs
let psas = [
    {
        title: "The Journey of Strength and Support",
        script: `
        <tr>
            <td><strong>Scene 1:</strong> The Hidden Depths</td>
            <td>"In the depths of our great ocean and the hearts of our people lie untold stories of strength and resilience. Like the ocean, our true power is often hidden beneath the surface."</td>
        </tr>
        <tr>
            <td><strong>Scene 2:</strong> The Tapestry of Silence</td>
            <td>"Silence, though, weaves a hidden tapestry our true selves. Breaking the silence reveals the threads of courage and authenticity that define us."</td>
        </tr>
        <tr>
            <td><strong>Scene 3:</strong> The Navigator's Wisdom</td>
            <td>"Guided by the stars, our navigators connected us across vast seas. Today, we navigate our own journeys with the same wisdom, seeking connection and understanding."</td>
        </tr>
        <tr>
            <td><strong>Scene 4:</strong> The Farmer's Legacy</td>
            <td>"Our farmers cultivate not just crops, but a legacy of resilience and hard work. Their hands tell a story of enduring strength and the bounties of our traditions."</td>
        </tr>
        <tr>
            <td><strong>Scene 5:</strong> The Healing Embrace</td>
            <td>"Healers blend nature’s gifts with the warmth of community care. True healing begins when we embrace our challenges and support one another."</td>
        </tr>
        <tr>
            <td><strong>Scene 6:</strong> The Dance of Unity</td>
            <td>"Every step of our dancers carries the stories of our people. In unity and rhythm, we find the pulse of our collective strength."</td>
        </tr>
        <tr>
            <td><strong>Scene 7:</strong> The Collective Voice</td>
            <td>"Together, our voices form a powerful wave of resilience. Sharing our stories and supporting one another transforms our silence into strength."</td>
        </tr>
        <tr>
            <td><strong>Closing Scene:</strong> Call to Action</td>
            <td>"Step forward and weave your story into the fabric of our community. In sharing, we find strength; in listening, we begin the journey to wellness. Let your voice be part of the Pacific's chorus of resilience."</td>
        </tr>
        `,
        color: "#ff6b6b" // Red color
    },
    {
        title: "Reputation of Resilience",
        script: `
        <tr>
            <td><strong>Scene 1:</strong> The Depths and Peaks</td>
            <td>"From the ocean’s depths to the mountain peaks, our strength lies in the unseen and the untold. Our true selves are revealed when we share our stories."</td>
        </tr>
        <tr>
            <td><strong>Scene 2:</strong> The Label of Courage</td>
            <td>"Labels can silence us, but courage breaks through. True reputation is built not on what we hide but on the bravery we show in facing our challenges."</td>
        </tr>
        <tr>
            <td><strong>Scene 3:</strong> The Farmer’s Strength</td>
            <td>"In the hands of our farmers, tradition and resilience flourish. Their legacy teaches us the power of nurturing and growth."</td>
        </tr>
        <tr>
            <td><strong>Scene 4:</strong> The Navigator’s Path</td>
            <td>"Navigators charted courses across vast seas, connecting us to our past and future. Today, we navigate our paths to wellness with the same determination."</td>
        </tr>
        <tr>
            <td><strong>Scene 5:</strong> The Healing Power</td>
            <td>"Healers embody the essence of community care, blending nature's gifts with compassion. Seeking help is a sign of strength, not weakness."</td>
        </tr>
        <tr>
            <td><strong>Scene 6:</strong> The Dance of Life</td>
            <td>"Our dancers express the vibrancy of our culture. Each step and beat is a testament to our unity and resilience."</td>
        </tr>
        <tr>
            <td><strong>Scene 7:</strong> The New Narrative</td>
            <td>"Together, we write a new narrative. Our voices create a symphony of strength, breaking the silence and building a reputation of resilience."</td>
        </tr>
        <tr>
            <td><strong>Closing Scene:</strong> Call to Action</td>
            <td>"Redefine your reputation with courage and hope. Speak up, reach out, and join our journey toward wellness. Let your story be one of resilience, support, and Pacific strength."</td>
        </tr>
        `,
        color: "#6bffb6" // Green color
    }
];

// Function to fetch PSAs from Firestore
async function fetchPSAs() {
    try {
        const querySnapshot = await getDocs(collection(db, "psas"));
        const savedPsas = [];
        querySnapshot.forEach((doc) => {
            savedPsas.push(doc.data());
        });

        if (savedPsas.length > 0) {
            psas = savedPsas;
        }
        displayPSAs();
    } catch (error) {
        console.error("Error fetching PSAs:", error);
    }
}

// Function to save PSA to Firestore
async function savePSAToFirebase(psa) {
    try {
        await setDoc(doc(db, "psas", psa.title), psa);
    } catch (error) {
        console.error("Error saving PSA:", error);
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
                <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})" onpaste="handlePaste(event)">${psa.script}</table>
                <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

// Handle paste events to ensure consistent formatting
function handlePaste(event) {
    event.preventDefault();

    const text = (event.clipboardData || window.clipboardData).getData('text');
    const sanitizedText = text.replace(/\n/g, "<br>");

    document.execCommand('insertHTML', false, sanitizedText);
}

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

// Toggle script visibility
function toggleScript(index) {
    const scriptDiv = document.getElementById(`script-${index}`);
    if (scriptDiv.classList.contains('hidden')) {
        scriptDiv.classList.remove('hidden');
    } else {
        scriptDiv.classList.add('hidden');
    }
}

// Show save button
function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove('hidden');
}

// Save PSA content
function savePSA(index) {
    const title = document.querySelector(`#psa-list .psa-item:nth-child(${index + 1}) h3`).innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index].script = script;

    savePSAToFirebase(psas[index]);

    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.add('hidden');
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
    displayPSAs();
});

// Load and display PSAs from Firestore on page load
document.addEventListener('DOMContentLoaded', async () => {
    await fetchPSAs();
});
