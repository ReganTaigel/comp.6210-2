// Import the needed webhooks
import {useEffect, useState} from 'react'

function ScpSubjects()
{
    // Create current state and set or update state variables use empty array as we want to display 
    // all records in the collection this will be automatically storted into this emprty array
    const [state, setState] = useState([]);

    // Function to connect to restDB and grab data and update our setState variable
    function getData()
    {
        // Code form RestDB to connect to their Rest Api
                var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) 
        {
            const passingscp = JSON.parse(this.responseText);

            setState(passingscp)
        }
        });

        xhr.open("GET", "https://comp6210-a799.restdb.io/rest/scpsubjects");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "63190db1e906d642de32430e");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    }

    // useing the use Effect webhook we can now tell the dom to dispaly the data 
    // first argument is function to grab the data, second argument is to update our current state
    // with the data 
    useEffect(()=>{getData();}, [state]);

    return(
        <div>
            {
                state && state.map(
                    scpSubjects => 
                    <div className="scporder" key="{scpSubjects.Item}">                        
                        <div className ='card shadow m-3 bg-light bg-gradient'>
                            <div className='card-body m-3'>

                                <h2 className = ' text-center'>Item #: {scpSubjects.Item}</h2>
                                <img src = {scpSubjects.Image} alt= "" className='img-fluid h-25 w-50 rounded mx-auto d-block '></img>
                                <h3 className = ' text-center'>Object Class : {scpSubjects.Class}</h3>
                                <p className = ''><b className='text-danger'>Containment:</b> {scpSubjects.Containment}</p>
                                <p className = ''><b className='text-warning'>Description:</b> {scpSubjects.Description}</p>

                            </div>                            
                        </div>
                    </div>
                    )
            }
        </div>
    );
}

export default ScpSubjects;