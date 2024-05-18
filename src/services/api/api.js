const API_URL = 'http://localhost:3000'

const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('There was a problem with fetch operation:', error)
    throw error
  }
}


export default fetchEvents