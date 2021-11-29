const bookInput = document.getElementById('book-input');
const displayInput = document.getElementById('search-result');
const errorDiv = document.getElementById('error');

//function for spinner
const spinner = displaystyle => {
  document.getElementById('spinner').style.display = displaystyle;
}

const getbooks = () => {
  const searchText = bookInput.value;
  // console.log(searchText);

  //run spinner
  spinner('block');

  bookInput.value = '';
  if (searchText === '') {
    errorDiv.innerText = 'no input given'
    spinner('none')
  }

  else {

    //get details api
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.numFound === 0) {
          document.getElementById('error').innerText = ' No Data Found...'
          spinner('none')
        }

        else {
          displayField(data.docs)
        }

      })

    errorDiv.innerText = '';
  }


}

//get image api
const bookcover = cover => {
  const url = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
  return url;
}

//displaying in the ui
const displayField = books => {
  displayInput.innerHTML = '';
  books.forEach(book => {
    console.log(book);

    const cover = bookcover(book.cover_i)

    const div = document.createElement('div');


    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 shadow">
                    <img height="300px" src="${cover}" class="card-img-top" alt="card-image">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">${book.title}</h5>
                      <h6 class="text-bold"><span class="fw-bold">Author :</span> ${book.author_name?.[0] || 'no author found'}</h6>
                      <h6 class="text-bold"><span class="fw-bold">Publisher :</span> ${book.publisher?.[0] || 'no Publisher found'}</h6>
                      <h6 class="text-bold"><span class="fw-bold">Published on :</span> ${book.first_publish_year}</h6>
                    </div>
                  </div>
        `
    displayInput.appendChild(div);

  });
  //stop the spinner
  spinner('none')
}


