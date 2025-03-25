document.addEventListener("DOMContentLoaded", () => {
    loadCrimeReports();
    loadForumPosts();
});

function reportCrime() {
    let crimeDescription = prompt("Enter details about the crime:");
    
    if (crimeDescription && crimeDescription.trim() !== "") {
        let crimeReports = JSON.parse(localStorage.getItem("crimeReports")) || [];
        let newReport = {
            date: new Date().toLocaleDateString(),
            description: crimeDescription.trim()
        };

        crimeReports.unshift(newReport);
        localStorage.setItem("crimeReports", JSON.stringify(crimeReports));
        loadCrimeReports();
    } else {
        alert("Crime description cannot be empty.");
    }
}

function loadCrimeReports() {
    let reportsContainer = document.getElementById("crime-list");
    let crimeReports = JSON.parse(localStorage.getItem("crimeReports")) || [];
    
    reportsContainer.innerHTML = "";
    
    crimeReports.forEach(report => {
        let listItem = document.createElement("li");
        let strongTag = document.createElement("strong");
        strongTag.textContent = `${report.date}: `;
        
        let textNode = document.createTextNode(report.description);
        
        listItem.appendChild(strongTag);
        listItem.appendChild(textNode);
        reportsContainer.appendChild(listItem);
    });
}

function postForumMessage() {
    let messageBox = document.getElementById("forum-message");
    let messageText = messageBox.value.trim();
    
    if (messageText !== "") {
        let forumPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
        let newPost = {
            date: new Date().toLocaleTimeString(),
            message: messageText
        };

        forumPosts.unshift(newPost);
        localStorage.setItem("forumPosts", JSON.stringify(forumPosts));
        messageBox.value = "";
        loadForumPosts();
    } else {
        alert("Forum message cannot be empty.");
    }
}

function loadForumPosts() {
    let forumContainer = document.getElementById("forum-posts");
    let forumPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    
    forumContainer.innerHTML = "";
    
    forumPosts.forEach(post => {
        let postItem = document.createElement("div");
        postItem.classList.add("forum-post");

        let strongTag = document.createElement("strong");
        strongTag.textContent = `${post.date}: `;

        let textNode = document.createTextNode(post.message);
        
        postItem.appendChild(strongTag);
        postItem.appendChild(textNode);
        forumContainer.appendChild(postItem);
    });
}
