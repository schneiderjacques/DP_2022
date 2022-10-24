


export async function fetchData(body, method, url) {
    const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            
            body: body
          })
          
  
        if (response.status == 401) {
          document.getElementById('alert-2').style.display= 'flex';
        }
        return response.json();
  }
