// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

//function to check if the URL is valid
const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

// Function to send data to the server
const sendURL = async (url = '', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
      });

      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
}

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    //checkForName(formText);

    const validation = isValidUrl(formText);
    // Check if the URL is valid
        // If the URL is valid, send it to the server using the serverURL constant above
        if(validation === true)
        {
            sendURL(serverURL, {"url": formText}).then(updateUI);
        }else{
            alert("unvalid url")
        }
      
}

//update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/sentiment');
  
    try{
      const allData = await request.json();
      console.log(allData);
      const sentiment= document.createElement("p");
      sentiment.textContent = allData.sentiment;
      const text = document.createElement("p");
      text.textContent =  allData.text;

      const tempDiv = document.createElement("div");
      tempDiv.appendChild(sentiment);
      tempDiv.appendChild(text);

      document.getElementById('results').innerHTML = "";
      document.getElementById('results').appendChild(tempDiv);
  
    }catch(error){
      console.log("error", error);
    }
  }
// Export the handleSubmit function
export { handleSubmit };
export { isValidUrl };

