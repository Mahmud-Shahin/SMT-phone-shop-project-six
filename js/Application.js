const searchingPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    if (searchFieldText == '') {
        document.getElementById('shown-error').innerText = 'Please Enter a Phone Name'
    }


    else {
        document.getElementById('shown-error').innerText = '';
        document.getElementById('phone-details').innerText = '';
        const url = (`https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`)
        fetch(url)
            .then(Res => Res.json())
            .then(data => displayResult(data.data))
    }

}

const displayResult = (allPhones) => {
    const divContainer = document.getElementById('phone-search')
    divContainer.textContent = '';
    if (allPhones.length == 0) {
        document.getElementById('shown-error').innerText = 'Phone Not Found!'
    }
    else {
        const phones = allPhones.slice(0, 20)

        phones.forEach(phone => {


            const div = document.createElement('div')
            div.innerHTML = `
        <div class="col ">
            <div class="card shadow p-3 mb-5 bg-body rounded mx-auto">
                <img src="${phone.image}" class="card-img-fluid mx-auto " style="max-width:300px" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-center">${phone.phone_name}</h4>
                    <h5 class="card-title text-center">${phone.brand}</h5>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button onclick="phoneDetails('${phone.slug}')" class="btn  btn-primary ms-2">Details</button>
                    </div>
                    
                </div>
            </div>
        </div>`
            divContainer.appendChild(div)
        })

    }
}

const phoneDetails = phoneId => {
    const url = (`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayMealDetails(data.data))
    document.getElementById('shown-error').innerText = '';
}
//Details Part
const displayMealDetails = details => {
    const detailsContianer = document.getElementById('phone-details');
    detailsContianer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row shadow">
        <div class="col-md-4">
            <img src="${details.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 text-break style="width: 18rem;" ">
            <div class="card-body ">
                <h4 class="card-title">Name: ${details.name}</h4>
                <h6 class="card-title">Release Date: ${details.releaseDate ? details.releaseDate : 'Not updated yet'}</h6>
                <h6 class="card-title">WLAN: ${details?.others?.WLAN ? details.others.WLAN : 'not found'}</h6>
                <h6 class="card-title">Blutooth: ${details?.others?.Bluetooth ? details.others.Bluetooth : 'not found'}</h6>
                <h6 class="card-title">Sensors: ${details.mainFeatures.sensors}</h6>
                <h6 class="card-title">Radio: ${details?.others?.Radio ? details.others.Radio : 'not found'}</h6>
                <h6 class="card-title">NFC: ${details?.others?.NFC ? details.others.NFC : 'not found'}</h6>
                <h6 class="card-title">USB: ${details?.others?.USB ? details.others.USB : 'not found'}</h6>
                
                
            </div>
        </div>
    </div>`;

    detailsContianer.appendChild(div);
    window.scroll(0, 100)

}


