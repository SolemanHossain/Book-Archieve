document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // /console.log(searchText);
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (docs.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        docs.forEach(doc => {
            console.log(doc);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `<div class="card" style="width: 18rem;">
            <img src=" https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${doc.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><p>Author Name:${doc.author_name}<p></li>
              <li class="list-group-item"><p>First Publication year:${doc.first_publish_year}</p></li>
            </ul>
          </div>
            
          
            `;
            searchResult.appendChild(div)
        })

    }

}