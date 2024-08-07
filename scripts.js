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
        psas = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                comments: Array.isArray(data.comments) ? data.comments : []  // Ensure comments is always an array
            };
        });
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
            <div class="psa-content-wrapper">
                <div class="psa-content">
                    <h3 class="psa-title-saved">${psa.title}</h3>
                    <div id="script-${index}" class="script-box" style="border-color: ${psa.color};">
                        <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                    </div>
                    <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
                </div>
                <div id="comments-${index}" class="comments-box">
                    <h4>Comments</h4>
                    <div contenteditable="true" class="comment-input">Add your comment here...</div>
                    <button class="save-comment-btn" onclick="saveComment(${index})">Save Comment</button>
                    <div class="comment-list" id="comment-list-${index}">
                        ${psa.comments.map(comment => `<div class="comment-item">${comment}</div>`).join('')}
                    </div>
                </div>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

document.getElementById("add-psa").addEventListener("click", () => {
    // Clear the form fields and prepare the PSA script table
    document.getElementById("psa-title").value = "";

    // Set up the initial table row for the script
    const scriptTable = `
        <tr>
            <td contenteditable="true"><strong>Scene 1:</strong></td>
            <td contenteditable="true">Enter your script content...</td>
        </tr>
    `;
    document.getElementById("psa-script").innerHTML = scriptTable;

    // Apply a border color to the PSA script container
    const color = colors[psas.length % colors.length];
    document.getElementById("psa-script-container").style.borderColor = color;

    // Initialize the comment area with placeholder text
    document.querySelector(".comment-input").innerText = "Add your comment here...";

    document.getElementById("new-psa-form").classList.remove("hidden");
});

document.getElementById("save-new-psa").addEventListener("click", () => {
    const title = document.getElementById("psa-title").value.trim();
    const scriptTable = document.getElementById("psa-script").innerHTML.trim();

    if (!title || !scriptTable) {
        alert("Both Title and Script are required to save the PSA.");
        return;
    }

    const newPSA = {
        title: title,
        script: scriptTable,
        comments: [],  // Ensure comments is initialized as an empty array
        color: document.getElementById("psa-script-container").style.borderColor
    };

    psas.push(newPSA);
    savePSAToFirebase(newPSA).then(() => {
        displayPSAs();
        document.getElementById("new-psa-form").classList.add("hidden");
    }).catch(error => {
        console.error("Error saving new PSA:", error);
        alert("Failed to save the new PSA. Please try again.");
    });
});

function showSaveButton(index) {
    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.remove("hidden");
}

function savePSA(index) {
    const titleElement = document.querySelector(
        `#psa-list .psa-item:nth-child(${index + 1}) h3`
    );
    const title = titleElement.innerText;
    const script = document.querySelector(`#script-${index} table`).innerHTML;

    psas[index].title = title;
    psas[index].script = script;

    savePSAToFirebase(psas[index]);

    // Apply the class to make the title bold and larger
    titleElement.classList.add('psa-title-saved');

    const saveBtn = document.getElementById(`save-${index}`);
    saveBtn.classList.add("hidden");
}

function saveComment(index) {
    const commentInput = document.querySelector(`#comments-${index} .comment-input`);
    const commentText = commentInput.innerText.trim();

    if (commentText && commentText !== "Add your comment here...") {
        psas[index].comments = psas[index].comments || [];
        psas[index].comments.push(commentText);

        const commentList = document.getElementById(`comment-list-${index}`);
        const newComment = document.createElement("div");
        newComment.className = "comment-item";
        newComment.textContent = commentText;
        commentList.appendChild(newComment);

        // Save the PSA with the new comment
        savePSAToFirebase(psas[index]);

        // Clear the comment input
        commentInput.innerText = "Add your comment here...";
    }
}

function handleEnterKey(event, index) {
    if (event.key === "Enter") {
        event.preventDefault();

        const table = document.querySelector(`#script-${index} table`);
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true"><strong>New Scene:</strong></td>
            <td contenteditable="true">"New script content..."</td>
        `;
        table.appendChild(newRow);

        showSaveButton(index);
    }
}

async function savePSAToFirebase(psa) {
    try {
        await db.collection("psas").doc(psa.title).set(psa);
    } catch (error) {
        console.error("Error saving PSA:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchPSAs);

function displayPSAs() {
    const psaList = document.getElementById("psa-list");
    psaList.innerHTML = "";

    psas.forEach((psa, index) => {
        const psaItem = document.createElement("div");
        psaItem.className = "psa-item";
        psaItem.innerHTML = `
            <div class="psa-content-wrapper">
                <div class="psa-content">
                    <h3 class="psa-title-saved">${psa.title}</h3>
                    <div id="script-${index}" class="script-box" style="border-color: ${psa.color};">
                        <table contenteditable="true" onkeydown="handleEnterKey(event, ${index})" oninput="showSaveButton(${index})">${psa.script}</table>
                    </div>
                    <button id="save-${index}" class="save-btn hidden" onclick="savePSA(${index})">Save</button>
                    <button id="toggle-comments-${index}" class="toggle-comments-btn" onclick="toggleComments(${index})">Show/Hide Comments</button>
                </div>
                <div id="comments-${index}" class="comments-box">
                    <h4>Comments</h4>
                    <div contenteditable="true" class="comment-input">Add your comment here...</div>
                    <button class="save-comment-btn" onclick="saveComment(${index})">Save Comment</button>
                    <div class="comment-list" id="comment-list-${index}">
                        ${psa.comments.map(comment => `<div class="comment-item">${comment}</div>`).join('')}
                    </div>
                </div>
            </div>
        `;
        psaList.appendChild(psaItem);
    });
}

function toggleComments(index) {
    const commentsDiv = document.getElementById(`comments-${index}`);
    commentsDiv.classList.toggle("hidden");
}
