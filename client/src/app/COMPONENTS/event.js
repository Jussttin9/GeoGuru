'use client'

import styles from '../page.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

/*
TODOS: 
    - if USA, decide which state
*/


export default function EventCard({ location, setSelectedEvents }) {
    // gets a list of nearby locations with each array element formatted as [{name, xid, image}]
    const [items, setItems] = useState([]);

    const countryCapitals = new Map([
        ["Afghanistan", "Kabul"],
        ["Albania", "Tirana"],
        ["Algeria", "Algiers"],
        ["Andorra", "Andorra la Vella"],
        ["Angola", "Luanda"],
        ["Antigua and Barbuda", "Saint John's"],
        ["Argentina", "Buenos Aires"],
        ["Armenia", "Yerevan"],
        ["Australia", "Canberra"],
        ["Austria", "Vienna"],
        ["Azerbaijan", "Baku"],
        ["Bahamas", "Nassau"],
        ["Bahrain", "Manama"],
        ["Bangladesh", "Dhaka"],
        ["Barbados", "Bridgetown"],
        ["Belarus", "Minsk"],
        ["Belgium", "Brussels"],
        ["Belize", "Belmopan"],
        ["Benin", "Porto-Novo"],
        ["Bhutan", "Thimphu"],
        ["Bolivia", "Sucre"],
        ["Bosnia and Herzegovina", "Sarajevo"],
        ["Botswana", "Gaborone"],
        ["Brazil", "Brasília"],
        ["Brunei", "Bandar Seri Begawan"],
        ["Bulgaria", "Sofia"],
        ["Burkina Faso", "Ouagadougou"],
        ["Burundi", "Gitega"],
        ["Cabo Verde", "Praia"],
        ["Cambodia", "Phnom Penh"],
        ["Cameroon", "Yaoundé"],
        ["Canada", "Ottawa"],
        ["Central African Republic", "Bangui"],
        ["Chad", "N'Djamena"],
        ["Chile", "Santiago"],
        ["China", "Beijing"],
        ["Colombia", "Bogotá"],
        ["Comoros", "Moroni"],
        ["Congo (Brazzaville)", "Brazzaville"],
        ["Congo (Kinshasa)", "Kinshasa"],
        ["Costa Rica", "San José"],
        ["Croatia", "Zagreb"],
        ["Cuba", "Havana"],
        ["Cyprus", "Nicosia"],
        ["Czechia", "Prague"],
        ["Denmark", "Copenhagen"],
        ["Djibouti", "Djibouti"],
        ["Dominica", "Roseau"],
        ["Dominican Republic", "Santo Domingo"],
        ["Ecuador", "Quito"],
        ["Egypt", "Cairo"],
        ["El Salvador", "San Salvador"],
        ["Equatorial Guinea", "Malabo"],
        ["Eritrea", "Asmara"],
        ["Estonia", "Tallinn"],
        ["Eswatini", "Mbabane"],
        ["Ethiopia", "Addis Ababa"],
        ["Fiji", "Suva"],
        ["Finland", "Helsinki"],
        ["France", "Paris"],
        ["Gabon", "Libreville"],
        ["Gambia", "Banjul"],
        ["Georgia", "Tbilisi"],
        ["Germany", "Berlin"],
        ["Ghana", "Accra"],
        ["Greece", "Athens"],
        ["Grenada", "Saint George's"],
        ["Guatemala", "Guatemala City"],
        ["Guinea", "Conakry"],
        ["Guinea-Bissau", "Bissau"],
        ["Guyana", "Georgetown"],
        ["Haiti", "Port-au-Prince"],
        ["Honduras", "Tegucigalpa"],
        ["Hungary", "Budapest"],
        ["Iceland", "Reykjavík"],
        ["India", "New Delhi"],
        ["Indonesia", "Jakarta"],
        ["Iran", "Tehran"],
        ["Iraq", "Baghdad"],
        ["Ireland", "Dublin"],
        ["Israel", "Jerusalem"],
        ["Italy", "Rome"],
        ["Jamaica", "Kingston"],
        ["Japan", "Tokyo"],
        ["Jordan", "Amman"],
        ["Kazakhstan", "Nur-Sultan"],
        ["Kenya", "Nairobi"],
        ["Kiribati", "Tarawa"],
        ["South Korea", "Seoul"],
        ["Kosovo", "Pristina"],
        ["Kuwait", "Kuwait City"],
        ["Kyrgyzstan", "Bishkek"],
        ["Laos", "Vientiane"],
        ["Latvia", "Riga"],
        ["Lebanon", "Beirut"],
        ["Lesotho", "Maseru"],
        ["Liberia", "Monrovia"],
        ["Libya", "Tripoli"],
        ["Liechtenstein", "Vaduz"],
        ["Lithuania", "Vilnius"],
        ["Luxembourg", "Luxembourg"],
        ["Madagascar", "Antananarivo"],
        ["Malawi", "Lilongwe"],
        ["Malaysia", "Kuala Lumpur"],
        ["Maldives", "Malé"],
        ["Mali", "Bamako"],
        ["Malta", "Valletta"],
        ["Marshall Islands", "Majuro"],
        ["Mauritania", "Nouakchott"],
        ["Mauritius", "Port Louis"],
        ["Mexico", "Mexico City"],
        ["Micronesia", "Palikir"],
        ["Moldova", "Chișinău"],
        ["Monaco", "Monaco"],
        ["Mongolia", "Ulaanbaatar"],
        ["Montenegro", "Podgorica"],
        ["Morocco", "Rabat"],
        ["Mozambique", "Maputo"],
        ["Myanmar", "Naypyidaw"],
        ["Namibia", "Windhoek"],
        ["Nauru", "Yaren"],
        ["Nepal", "Kathmandu"],
        ["Netherlands", "Amsterdam"],
        ["New Zealand", "Wellington"],
        ["Nicaragua", "Managua"],
        ["Niger", "Niamey"],
        ["Nigeria", "Abuja"],
        ["North Macedonia", "Skopje"],
        ["Norway", "Oslo"],
        ["Oman", "Muscat"],
        ["Pakistan", "Islamabad"],
        ["Palau", "Ngerulmud"],
        ["Panama", "Panama City"],
        ["Papua New Guinea", "Port Moresby"],
        ["Paraguay", "Asunción"],
        ["Peru", "Lima"],
        ["Philippines", "Manila"],
        ["Poland", "Warsaw"],
        ["Portugal", "Lisbon"],
        ["Qatar", "Doha"],
        ["Romania", "Bucharest"],
        ["Russia", "Moscow"],
        ["Rwanda", "Kigali"],
        ["Saint Kitts and Nevis", "Basseterre"],
        ["Saint Lucia", "Castries"],
        ["Saint Vincent and the Grenadines", "Kingstown"],
        ["Samoa", "Apia"],
        ["San Marino", "San Marino"],
        ["Sao Tome and Principe", "São Tomé"],
        ["Saudi Arabia", "Riyadh"],
        ["Senegal", "Dakar"],
        ["Serbia", "Belgrade"],
        ["Seychelles", "Victoria"],
        ["Sierra Leone", "Freetown"],
        ["Singapore", "Singapore"],
        ["Slovakia", "Bratislava"],
        ["Slovenia", "Ljubljana"],
        ["Solomon Islands", "Honiara"],
        ["Somalia", "Mogadishu"],
        ["South Africa", "Pretoria"],
        ["South Sudan", "Juba"],
        ["Spain", "Madrid"],
        ["Sri Lanka", "Sri Jayawardenepura Kotte"],
        ["Sudan", "Khartoum"],
        ["Suriname", "Paramaribo"],
        ["Sweden", "Stockholm"],
        ["Switzerland", "Bern"],
        ["Syria", "Damascus"],
        ["Taiwan", "Taipei"],
        ["Tajikistan", "Dushanbe"],
        ["Tanzania", "Dodoma"],
        ["Thailand", "Bangkok"],
        ["Timor-Leste", "Dili"],
        ["Togo", "Lomé"],
        ["Tonga", "Nuku'alofa"],
        ["Trinidad and Tobago", "Port of Spain"],
        ["Tunisia", "Tunis"],
        ["Turkey", "Ankara"],
        ["Turkmenistan", "Ashgabat"],
        ["Tuvalu", "Funafuti"],
        ["Uganda", "Kampala"],
        ["Ukraine", "Kyiv"],
        ["United Arab Emirates", "Abu Dhabi"],
        ["United Kingdom", "London"],
        ["United States", "LaJolla"],
        ["Uruguay", "Montevideo"],
        ["Uzbekistan", "Tashkent"],
        ["Vanuatu", "Port Vila"],
        ["Vatican City", "Vatican City"],
        ["Venezuela", "Caracas"],
        ["Vietnam", "Hanoi"],
        ["Yemen", "Sana'a"],
        ["Zambia", "Lusaka"],
        ["Zimbabwe", "Harare"]
    ]);

    const countryCodes = new Map([
        ["Afghanistan", "af"],
        ["Albania", "al"],
        ["Algeria", "dz"],
        ["Andorra", "ad"],
        ["Angola", "ao"],
        ["Antigua and Barbuda", "ag"],
        ["Argentina", "ar"],
        ["Armenia", "am"],
        ["Australia", "au"],
        ["Austria", "at"],
        ["Azerbaijan", "az"],
        ["Bahamas", "bs"],
        ["Bahrain", "bh"],
        ["Bangladesh", "bd"],
        ["Barbados", "bb"],
        ["Belarus", "by"],
        ["Belgium", "be"],
        ["Belize", "bz"],
        ["Benin", "bj"],
        ["Bhutan", "bt"],
        ["Bolivia", "bo"],
        ["Bosnia and Herzegovina", "ba"],
        ["Botswana", "bw"],
        ["Brazil", "br"],
        ["Brunei", "bn"],
        ["Bulgaria", "bg"],
        ["Burkina Faso", "bf"],
        ["Burundi", "bi"],
        ["Cabo Verde", "cv"],
        ["Cambodia", "kh"],
        ["Cameroon", "cm"],
        ["Canada", "ca"],
        ["Central African Republic", "cf"],
        ["Chad", "td"],
        ["Chile", "cl"],
        ["China", "cn"],
        ["Colombia", "co"],
        ["Comoros", "km"],
        ["Congo (Brazzaville)", "cg"],
        ["Congo (Kinshasa)", "cd"],
        ["Costa Rica", "cr"],
        ["Croatia", "hr"],
        ["Cuba", "cu"],
        ["Cyprus", "cy"],
        ["Czechia", "cz"],
        ["Denmark", "dk"],
        ["Djibouti", "dj"],
        ["Dominica", "dm"],
        ["Dominican Republic", "do"],
        ["Ecuador", "ec"],
        ["Egypt", "eg"],
        ["El Salvador", "sv"],
        ["Equatorial Guinea", "gq"],
        ["Eritrea", "er"],
        ["Estonia", "ee"],
        ["Eswatini", "sz"],
        ["Ethiopia", "et"],
        ["Fiji", "fj"],
        ["Finland", "fi"],
        ["France", "fr"],
        ["Gabon", "ga"],
        ["Gambia", "gm"],
        ["Georgia", "ge"],
        ["Germany", "de"],
        ["Ghana", "gh"],
        ["Greece", "gr"],
        ["Grenada", "gd"],
        ["Guatemala", "gt"],
        ["Guinea", "gn"],
        ["Guinea-Bissau", "gw"],
        ["Guyana", "gy"],
        ["Haiti", "ht"],
        ["Honduras", "hn"],
        ["Hungary", "hu"],
        ["Iceland", "is"],
        ["India", "in"],
        ["Indonesia", "id"],
        ["Iran", "ir"],
        ["Iraq", "iq"],
        ["Ireland", "ie"],
        ["Israel", "il"],
        ["Italy", "it"],
        ["Jamaica", "jm"],
        ["Japan", "jp"],
        ["Jordan", "jo"],
        ["Kazakhstan", "kz"],
        ["Kenya", "ke"],
        ["Kiribati", "ki"],
        ["South Korea", "kr"],
        ["Kosovo", "xk"],
        ["Kuwait", "kw"],
        ["Kyrgyzstan", "kg"],
        ["Laos", "la"],
        ["Latvia", "lv"],
        ["Lebanon", "lb"],
        ["Lesotho", "ls"],
        ["Liberia", "lr"],
        ["Libya", "ly"],
        ["Liechtenstein", "li"],
        ["Lithuania", "lt"],
        ["Luxembourg", "lu"],
        ["Madagascar", "mg"],
        ["Malawi", "mw"],
        ["Malaysia", "my"],
        ["Maldives", "mv"],
        ["Mali", "ml"],
        ["Malta", "mt"],
        ["Marshall Islands", "mh"],
        ["Mauritania", "mr"],
        ["Mauritius", "mu"],
        ["Mexico", "mx"],
        ["Micronesia", "fm"],
        ["Moldova", "md"],
        ["Monaco", "mc"],
        ["Mongolia", "mn"],
        ["Montenegro", "me"],
        ["Morocco", "ma"],
        ["Mozambique", "mz"],
        ["Myanmar", "mm"],
        ["Namibia", "na"],
        ["Nauru", "nr"],
        ["Nepal", "np"],
        ["Netherlands", "nl"],
        ["New Zealand", "nz"],
        ["Nicaragua", "ni"],
        ["Niger", "ne"],
        ["Nigeria", "ng"],
        ["North Macedonia", "mk"],
        ["Norway", "no"],
        ["Oman", "om"],
        ["Pakistan", "pk"],
        ["Palau", "pw"],
        ["Panama", "pa"],
        ["Papua New Guinea", "pg"],
        ["Paraguay", "py"],
        ["Peru", "pe"],
        ["Philippines", "ph"],
        ["Poland", "pl"],
        ["Portugal", "pt"],
        ["Qatar", "qa"],
        ["Romania", "ro"],
        ["Russia", "ru"],
        ["Rwanda", "rw"],
        ["Saint Kitts and Nevis", "kn"],
        ["Saint Lucia", "lc"],
        ["Saint Vincent and the Grenadines", "vc"],
        ["Samoa", "ws"],
        ["San Marino", "sm"],
        ["Sao Tome and Principe", "st"],
        ["Saudi Arabia", "sa"],
        ["Senegal", "sn"],
        ["Serbia", "rs"],
        ["Seychelles", "sc"],
        ["Sierra Leone", "sl"],
        ["Singapore", "sg"],
        ["Slovakia", "sk"],
        ["Slovenia", "si"],
        ["Solomon Islands", "sb"],
        ["Somalia", "so"],
        ["South Africa", "za"],
        ["South Sudan", "ss"],
        ["Spain", "es"],
        ["Sri Lanka", "lk"],
        ["Sudan", "sd"],
        ["Suriname", "sr"],
        ["Sweden", "se"],
        ["Switzerland", "ch"],
        ["Syria", "sy"],
        ["Taiwan", "tw"],
        ["Tajikistan", "tj"],
        ["Tanzania", "tz"],
        ["Thailand", "th"],
        ["Timor-Leste", "tl"],
        ["Togo", "tg"],
        ["Tonga", "to"],
        ["Trinidad and Tobago", "tt"],
        ["Tunisia", "tn"],
        ["Turkey", "tr"],
        ["Turkmenistan", "tm"],
        ["Tuvalu", "tv"],
        ["Uganda", "ug"],
        ["Ukraine", "ua"],
        ["United Arab Emirates", "ae"],
        ["United Kingdom", "uk"],
        ["United States", "us"],
        ["Uruguay", "uy"],
        ["Uzbekistan", "uz"],
        ["Vanuatu", "vu"],
        ["Vatican City", "va"],
        ["Venezuela", "ve"],
        ["Vietnam", "vn"],
        ["Yemen", "ye"],
        ["Zambia", "zm"],
        ["Zimbabwe", "zw"]
    ]);

    const url = `${process.env.NEXT_PUBLIC_DEPLOY_URL}/info/attractions?city=${countryCapitals.get(location)}&country=${countryCodes.get(location)}&radius=10000`;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const fetchRetry = async (url, retries = 3, delayMS = 1000) => {
        try {
            const response = await axios.get(url);
            const seenEvents = new Set();
            const uniqueEvents = [];
            response.data.forEach(event => {
              if(!seenEvents.has(event.name)) {
                  seenEvents.add(event.name);
                  uniqueEvents.push(event);
              }
            });
            updateItems(uniqueEvents);
        } catch (error) {
            if (retries > 0 && error.response && error.response.status === 500) {
                await delay(delayMS);
                fetchRetry(url, retries - 1, delayMS * 2);
            } else {
                console.error('Failed to retrieve nearby events:', error);
            }
        }
    }

    // const fetchEvents = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/info/attractions?city=${countryCapitals.get(location)}&country=${countryCodes.get(location)}&radius=10000`);
    //       const seenEvents = new Set();
    //       const uniqueEvents = [];
    //       response.data.forEach(event => {
    //         if(!seenEvents.has(event.name)) {
    //             seenEvents.add(event.name);
    //             uniqueEvents.push(event);
    //         }
    //       });
    //       updateItems(uniqueEvents);
    //     } catch(error) {
    //       console.error('Failed to retrieve nearby events:', error);
    //     };
    // }

    function updateItems(eventList) {
        setItems(eventList.map(item => ({
            id: item.name,
            label: item.name,
            checked: false
        })));
    }

    const handleCheckboxChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    useEffect(() => {
        fetchRetry(url);
    }, []);

    useEffect(() => {
        setSelectedEvents(location, items.filter(item => item.checked).map(item => item.id));
    }, [items]);

    return (
        <div className={styles.eventChecklist}>
            <h2 className={styles.country}>{location}</h2>
            {items.map(item => (
                <div key={item.id} className={styles.eventCard}>
                    <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(item.id)}
                        className={styles.checkbox}
                    />
                    <label htmlFor={item.id} className={styles.checkboxLabel}></label>
                    <div className={styles.eventText}>
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
}