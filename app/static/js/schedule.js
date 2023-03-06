const query_params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});  // Query params
const BASE_API = ('http://81.200.145.23:443');
const API_VERSION = ('v1');
const API_LINK = `${BASE_API}/api/${API_VERSION}`;
const SCHEDULE_API = `${API_LINK}/schedule`;

const ITEM_DATES = document.getElementsByClassName('item-date');
const ITEM_DAYS = document.getElementsByClassName('item-day');

async function fillScheduleDays() {
    let schedule_days = await getScheduleDays();
    for (let i = 0; i < schedule_days.length; i++) {
        ITEM_DATES[i].innerHTML = schedule_days[i].date;
        ITEM_DAYS[i].innerHTML = schedule_days[i].day_of_week;
    }

    let siteTitleData = query_params.name;

    let siteTitle = document.querySelector('.site-title-inner');
    siteTitle.innerHTML = siteTitleData;

    return schedule_days;
    // FILL
}

async function fillPairs() {
    let dispatcher = query_params.dispatcher;
    let group = query_params.group;
    let pairsData = await getPairs(dispatcher, group);

    let pairs = document.querySelectorAll('.pars-all-name');
    let teachers = document.querySelectorAll('.pars-all-fio');
    let cabinets = document.querySelectorAll('.pars-cabinet');
    let replace = document.querySelectorAll('.pars-replace');
    let allPairs = document.querySelectorAll('.pars-all');
    let allCabinets = document.querySelectorAll('.pars-cabinet');
    let allPairsBottom = document.querySelectorAll('.pars-bottom');
    let allTime = document.querySelectorAll('.pars-time');

    for (let i = 0; i < pairsData.length; i++) {
        pairs[i].innerHTML = pairsData[i].name;
        teachers[i].innerHTML = pairsData[i].teacher;
        cabinets[i].innerHTML = pairsData[i].cabinet;

        if (pairsData[i].is_replace) {
            replace[i].innerHTML = 'Замена';
            replace[i].classList.add('active');
            if (!(cabinets[i].innerHTML)) {
                // pairs[i].innerHTML = 'Снято';
                allPairsBottom[i].classList.add('replace_active');
            }
        }
        if (pairsData[i].not_learning) {
            pairs[i].innerHTML = 'Не учатся';
        }
        if (pairsData[i].is_weekend) {
            pairs[i].innerHTML = 'Каникулы';
        }

        if (pairs[i].innerHTML) {
            allPairs[i].classList.add('active');
        }
        if (cabinets[i].innerHTML) {
            allCabinets[i].classList.add('active');
            allTime[i].classList.add('active');
        }
    }
    // FILL
}

async function getScheduleDays() {
    let response = await fetch(`${SCHEDULE_API}/schedule_days`);
    return await response.json();
}

async function getPairs(dispatcher, group) {
    let response = await fetch(`${SCHEDULE_API}/dispatcher/${dispatcher}/group/${group}`);
    return await response.json();
}

async function createTable() {
    let trs = document.querySelectorAll('tr');
    let days = await getScheduleDays();
    for (let i = 0; i < days.length; i++) {
        let td = document.createElement('td');

        let div = document.createElement('div');
        div.classList.add('item', 'item-head');
        td.appendChild(div);

        let spanTop = document.createElement('span');
        spanTop.classList.add('item-date');
        div.appendChild(spanTop);

        let hr = document.createElement('hr');
        div.appendChild(hr);

        let spanBottom = document.createElement('span');
        spanBottom.classList.add('item-day');
        div.appendChild(spanBottom);

        trs[0].appendChild(td);
    }
    for (let i = 1; i < 8; i++) {
        for (let j = 0; j < days.length; j++) {
            let td = document.createElement('td');

            let div = document.createElement('div');
            div.classList.add('item');
            td.appendChild(div);

            let divPars = document.createElement('div');
            divPars.classList.add('pars');
            div.appendChild(divPars);

            let divParsTime = document.createElement('div');
            divParsTime.classList.add('pars-time');
            switch (i) {
                case 1: 
                    divParsTime.innerHTML = '08:00 - 09:35';
                    break;
                case 2: 
                    divParsTime.innerHTML = '09:45 - 11:20';
                    break;
                case 3: 
                    divParsTime.innerHTML = '11:30 - 13:05';
                    break;
                case 4: 
                    divParsTime.innerHTML = '13:45 - 15:20';
                    break;
                case 5: 
                    divParsTime.innerHTML = '15:30 - 17:05';
                    break;
                case 6: 
                    divParsTime.innerHTML = '17:15 - 18:50';
                    break;
                case 7: 
                    divParsTime.innerHTML = '19:00 - 20:35';
                    break;
            }
            divPars.appendChild(divParsTime);

            let divParsAll = document.createElement('div');
            divParsAll.classList.add('pars-all');
            divPars.appendChild(divParsAll);

            let divParsAllName = document.createElement('div');
            divParsAllName.classList.add('pars-all-name');
            divParsAll.appendChild(divParsAllName);

            let divParsAllFIO = document.createElement('div');
            divParsAllFIO.classList.add('pars-all-fio');
            divParsAll.appendChild(divParsAllFIO);

            let divParsBottom = document.createElement('div');
            divParsBottom.classList.add('pars-bottom');
            div.appendChild(divParsBottom);

            let divParsCabinet = document.createElement('div');
            divParsCabinet.classList.add('pars-cabinet');
            divParsBottom.appendChild(divParsCabinet);

            let divParsReplace = document.createElement('div');
            divParsReplace.classList.add('pars-replace');
            divParsBottom.appendChild(divParsReplace);

            trs[i].appendChild(td);
        }
    }
}


document.body.onload = function () {
    createTable();
    fillScheduleDays();
    fillPairs();
}
