export const addJokeToDatabase = (joke) => {
    return fetch('http://localhost:8088/jokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joke),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
  };
  
  export const handleSubmit = (newOneLiner, setNewOneLiner) => {
    const jokeObject = {
      text: newOneLiner,
      told: false
    };
  
    addJokeToDatabase(jokeObject)
      .then(() => {
        setNewOneLiner("");
      })
      .catch((error) => {
        console.error('Failed to add joke:', error);
      });
  };