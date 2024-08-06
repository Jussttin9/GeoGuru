'use client'

import styles from '../page.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

/*
TODOS: 
    - get country and convert into capital city
    - if USA, decide which state
    - make it so it doesnt refresh checkbox and events with every render (get rid of useEffect)
*/


export default function EventCard({ locations }) {
    // gets a list of nearby locations with each array element formatted as [{name, xid, image}]
    const [events, setEvents] = useState([]);
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
        ["United States", "USA"],
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
      

    const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/info/attractions?city=${countryCapitals.get('South Korea')}&country=kr&radius=10000`);
          setEvents(response.data);
          updateItems(response.data);
        } catch(error) {
          console.error('Failed to retrieve nearby events:', error);
        };
    }

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
        fetchEvents();
    }, []);

    return (
        <div className={styles.eventChecklist}>
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