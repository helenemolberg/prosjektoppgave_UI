const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337/api/images' : 'another-adress';

// Fetches all data
export async function getImages() {
    const response = await fetch(API_URL);
    return response.json();  
}
// Sorts on one project
export async function getFilesProject(prosjekt) {
  console.log(prosjekt);
  const response = await fetch(`${API_URL}/${prosjekt}`);
  return response.json();
}
// Fetches the pictures
export async function getPictures(filename) {
  const response = await fetch(`${API_URL}/image/${filename}`);
  return response.text().then(data => console.log(data));
}
// Sorts on DateRange
export async function getDateRange(value) {
  console.log(value);
  const response = await fetch(`${API_URL}/daterange/${value}`);
  return response.json();
}

// Gets the position of user
export function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((location) => {
              return {
                lat: location.latitude,
                lng: location.longitude,
              };
            })
        );
      }
    );
  });
}

// Headeren må være tom
// POST: the new entry data
export function sendFile(entry){
    return fetch(API_URL, {
        method: 'POST',
        body: entry,
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {console.error(error)});
}