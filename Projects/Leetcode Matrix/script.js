document.addEventListener("DOMContentLoaded", function()
{
    const searchButton = document.getElementById("user-input-button");
    const usernameInput = document.getElementById("user-input-field");
    const statsContainer = document.getElementById("stats-container");

    const easyProgress = document.getElementById("easy-problems");
    const mediumProgress = document.getElementById("medium-problems");
    const hardProgress = document.getElementById("hard-problems");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-card");


    function validateUsername(username) 
    {
        if(username.trim() === "") 
        {
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);

        if(!isMatching) 
        {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) 
    {
        try
        {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            
            if(!response.ok) 
            {
                throw new Error("Unable to fetch the User details");
            }

            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) 
        {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally 
        {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }


    searchButton.addEventListener('click', function() 
    {
        const username = usernameInput.value;
        console.log("logggin username: ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
})