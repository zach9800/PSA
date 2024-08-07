// Define an array of colors to use for PSAs
const colors = ["#ff6b6b", "#6bffb6", "#6b6bff", "#ffff6b", "#ff6bff"];

// Initialize an array for PSAs with predefined scripts
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
            <td>"Silence, though, weaves a hidden tapestry of our true selves. Breaking the silence reveals the threads of courage and authenticity that define us."</td>
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
    },
    {
        title: "Pathways to Wellness",
        script: `
        <tr>
            <td><strong>Scene 1:</strong> The Quiet Struggle</td>
            <td>"In the quiet moments of struggle, many of us face battles unseen. Behavioral health challenges can feel isolating, but you are not alone."</td>
        </tr>
        <tr>
            <td><strong>Scene 2:</strong> The Courage to Seek Help</td>
            <td>"It takes immense courage to seek help. Reaching out is a powerful step towards healing, showing strength in vulnerability."</td>
        </tr>
        <tr>
            <td><strong>Scene 3:</strong> The Support Network</td>
            <td>"Our community thrives when we support one another. Friends, family, and neighbors form a network of care, ready to listen and help."</td>
        </tr>
        <tr>
            <td><strong>Scene 4:</strong> The Power of Conversation</td>
            <td>"A simple conversation can be a lifeline. Talking openly about mental health breaks down stigma and fosters understanding."</td>
        </tr>
        <tr>
            <td><strong>Scene 5:</strong> The Healing Journey</td>
            <td>"Healing is a journey, not a destination. It involves small steps, patience, and the support of those around you."</td>
        </tr>
        <tr>
            <td><strong>Scene 6:</strong> The Role of Culture</td>
            <td>"Our cultural heritage provides strength and resilience. Traditions, stories, and practices can be powerful tools in our wellness journey."</td>
        </tr>
        <tr>
            <td><strong>Scene 7:</strong> Embracing Change</td>
            <td>"Embracing change and growth is essential. Behavioral health is about adapting, learning, and finding new ways to thrive."</td>
        </tr>
        <tr>
            <td><strong>Closing Scene:</strong> Call to Action</td>
            <td>"Take the first step towards wellness. Speak up, reach out, and lean on your community. Together, we can create a supportive environment where everyone has the opportunity to thrive. Your mental health matters. Your story matters. Let's walk this path together."</td>
        </tr>
        `,
        color: "#6b6bff" // Blue color
    },
    {
        title: "Tapestry (Combined)",
        script: `
        <tr>
            <td><strong>Scene 1:</strong> Elders’ Wisdom</td>
            <td>"Our elders, bearers of tradition and wisdom, guide us with stories of resilience and perseverance. Their voices, rich with experience, lay the foundations of our community's strength."</td>
        </tr>
        <tr>
            <td><strong>Scene 2:</strong> The Farmer’s Strength</td>
            <td>"In the hands of our farmers, tradition and sustainability flourish. Their legacy teaches us the power of nurturing and growth."</td>
        </tr>
        <tr>
            <td><strong>Scene 3:</strong> The Healing Power</td>
            <td>"Healers embody the essence of community care, blending nature's gifts with compassion. Seeking help is a sign of strength, not weakness."</td>
        </tr>
        <tr>
            <td><strong>Scene 4:</strong> The Dance of Life</td>
            <td>"Our dancers express the vibrancy of our culture - each step and beat is a testament to our unity."</td>
        </tr>
        <tr>
            <td><strong>Scene 5:</strong> Youth Engagement</td>
            <td>"The youth bring vitality and new perspectives, infusing our community with energy and innovation. They carry forward our traditions and adapt them to the challenges of today."</td>
        </tr>
        <tr>
            <td><strong>Scene 6:</strong> The Collective Voice</td>
            <td>"Together, our community represents a woven tapestry of beauty and strength. And so when challenges with mental and behavioral health appear, don’t look far."</td>
        </tr>
        <tr>
            <td><strong>Scene 7:</strong> Collective Healing</td>
            <td>"Collective healing comes from our unity. As we stand together, support one another, and share our journeys, we heal not only as individuals but as a whole community."</td>
        </tr>
        <tr>
            <td><strong>Closing Scene:</strong> Conclusion</td>
            <td>"Our community's tapestry is vibrant and durable because of each thread it contains. Let us continue to weave this tapestry with care, ensuring that its strength supports us all. Together, we build a future where no one is alone, and everyone is supported."</td>
        </tr>
        `,
        color: "#ffff6b" // Yellow color
    },
    {
        title: "Combined PSA",
        script: `
        <tr>
            <td><strong>Scene 1:</strong> The Hidden Depths</td>
            <td>"In the depths of our great ocean and the hearts of our people lie untold stories of strength and resilience. Like the ocean, our true power is often hidden beneath the surface."</td>
        </tr>
        <tr>
            <td><strong>Scene 2:</strong> Breaking Silence</td>
            <td>"Stress, anxiety, substance use, etc., however, can silence us and keep our true selves hidden beneath the depths. In these quiet moments of struggle, many of us face battles unseen. But by breaking our silence, we reveal the threads of courage and authenticity that define us."</td>
        </tr>
        <tr>
            <td><strong>Scene 3:</strong> Reputation</td>
            <td>"True reputation is built not on what we hide but on the bravery we show in facing our struggles. Behavioral health challenges can feel isolating, but you are not alone."</td>
        </tr>
        <tr>
            <td><strong>Scene 4:</strong> Community Support</td>
            <td>"It takes immense courage to seek help, but our community thrives when we support one another. Friends, family, and neighbors form a network of care, ready to listen and help."</td>
        </tr>
        <tr>
            <td><strong>Scene 5:</strong> Together</td>
            <td>"Wellness is a journey, one that involves small steps, patience, and the support of those around you. So let's take our first step, together."</td>
        </tr>
        <tr>
            <td><strong>Closing Scene:</strong> Call to Action</td>
            <td>"Speak up, reach out, and lean on your community. Together, we can create a supportive environment where everyone has the opportunity to thrive. Your mental health matters. Your story matters. And you matter. Let's walk this path together."</td>
        </tr>
        `,
        color: "#ff6bff" // Purple color
    }
];

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


