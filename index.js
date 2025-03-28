document.addEventListener("DOMContentLoaded", () => {
    loadCrimeReports();
    loadForumPosts();
});

const API_URL = "http://localhost:5000";


async function reportCrime() {
    let crimeDescription = prompt("Enter details about the crime:");

    if (crimeDescription && crimeDescription.trim() !== "") {
        let newReport = {
            date: new Date().toISOString(),
            description: crimeDescription.trim()
        };

        try {
            let response = await fetch(`${API_URL}/crimeReports`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReport)
            });

            if (response.ok) {
                loadCrimeReports();
            } else {
                alert("Error reporting crime.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        alert("Crime description cannot be empty.");
    }
}


async function loadCrimeReports() {
    let reportsContainer = document.getElementById("crime-list");

    try {
        let response = await fetch(`${API_URL}/crimeReports`);
        let crimeReports = await response.json();

        reportsContainer.innerHTML = "";
        crimeReports.forEach(report => {
            let listItem = document.createElement("li");
            let strongTag = document.createElement("strong");
            strongTag.textContent = `${new Date(report.date).toLocaleDateString()}: `;
            
            let textNode = document.createTextNode(report.description);
            
            listItem.appendChild(strongTag);
            listItem.appendChild(textNode);
            reportsContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}


async function postForumMessage() {
    let messageBox = document.getElementById("forum-message");
    let messageText = messageBox.value.trim();

    if (messageText !== "") {
        let newPost = {
            date: new Date().toISOString(),
            message: messageText
        };

        try {
            let response = await fetch(`${API_URL}/forumPosts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                messageBox.value = "";
                loadForumPosts();
            } else {
                alert("Error posting message.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        alert("Forum message cannot be empty.");
    }
}


async function loadForumPosts() {
    let forumContainer = document.getElementById("forum-posts");

    try {
        let response = await fetch(`${API_URL}/forumPosts`);
        let forumPosts = await response.json();

        forumContainer.innerHTML = "";
        forumPosts.forEach(post => {
            let postItem = document.createElement("div");
            postItem.classList.add("forum-post");

            let strongTag = document.createElement("strong");
            strongTag.textContent = `${new Date(post.date).toLocaleTimeString()}: `;

            let textNode = document.createTextNode(post.message);

            postItem.appendChild(strongTag);
            postItem.appendChild(textNode);
            forumContainer.appendChild(postItem);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
