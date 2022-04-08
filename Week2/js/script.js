


let curr = 4;
let locations = [
    {
        title: 'Calgary',
        population: 1_481_806,
        lat: 51.049999,
        long: -114.066666
    },
    {
        title: 'Ottawa',
        population: 1_488_307,
        lat: 45.424721,
        long: -75.695000
    },
    {
        title: 'Vancouver',
        population: 2_642_825,
        lat: 49.246292,
        long: -123.116226
    },
    {
        title: 'Montreal',
        population: 4_291_732,
        lat: 45.508888,
        long: -73.561668
    },
    {
        title: 'Toronto',
        population: 6_202_225,
        lat: 43.651070,
        long: -79.347015
    }
];

// I'm lazy
locations.reverse()



document.getElementById('next').onclick = e => {
    updateCurrent()
}

const map = L.map('map').setView([49.276292,-123.116226], 10);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

locations.forEach(loc => {
    L.marker([loc.lat, loc.long]).addTo(map)
    .bindPopup(`${loc.title}\n<b>Population:</b>&nbsp${loc.population}`);
})

function updateCurrent() {
    curr = curr == 4 ? 0 : curr + 1;
    document.getElementById('current').innerHTML = `${curr + 1}. ${locations[curr].title}, Population: ${popFormatter(locations[curr].population)}`;

    map.flyTo([locations[curr].lat, locations[curr].long])
}

function popFormatter(pop) {
    let arr = String(pop).split('');
    arr.reverse();
    for(let n = 0; n < arr.length - 1; n++) {
        if((n+1) % 3 == 0) {
            console.log('as')
            arr[n] = `,${arr[n]}`
        }
    }
    arr.reverse();
    return arr.join('')
}

console.log(popFormatter(6_202_225))

updateCurrent();