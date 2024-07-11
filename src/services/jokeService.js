export const getAllJokes = async () => {
    const response = await fetch("http://localhost:8088/jokes")
    const jokes = await response.json()
    return jokes
}

export const addJokeToDatabase = async (joke) => {
    return await fetch('http://localhost:8088/jokes', {
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
  
  export const handleSubmit = async (newOneLiner, setNewOneLiner) => {
    const jokeObject = {
      text: newOneLiner,
      told: false
    };
  
   await addJokeToDatabase(jokeObject)
      .then(() => {
        setNewOneLiner("");
      })
      .catch((error) => {
        console.error('Failed to add joke:', error);
      });
  };

  export const updateJokeInDatabase = async (joke) => {
    return await fetch(`http://localhost:8088/jokes/${joke.id}`, {
      method: 'PUT',
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
  