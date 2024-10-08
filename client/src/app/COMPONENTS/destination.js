import Select from 'react-select';
import styles from '../page.module.css'
import { useEffect, useState } from 'react';

export default function DestinationComponent() {
    const options = [
        { value: 'afghanistan', label: 'Afghanistan' },
        { value: 'albania', label: 'Albania' },
        { value: 'algeria', label: 'Algeria' },
        { value: 'andorra', label: 'Andorra' },
        { value: 'angola', label: 'Angola' },
        { value: 'antigua-and-barbuda', label: 'Antigua and Barbuda' },
        { value: 'argentina', label: 'Argentina' },
        { value: 'armenia', label: 'Armenia' },
        { value: 'australia', label: 'Australia' },
        { value: 'austria', label: 'Austria' },
        { value: 'azerbaijan', label: 'Azerbaijan' },
        { value: 'bahamas', label: 'Bahamas' },
        { value: 'bahrain', label: 'Bahrain' },
        { value: 'bangladesh', label: 'Bangladesh' },
        { value: 'barbados', label: 'Barbados' },
        { value: 'belarus', label: 'Belarus' },
        { value: 'belgium', label: 'Belgium' },
        { value: 'belize', label: 'Belize' },
        { value: 'benin', label: 'Benin' },
        { value: 'bhutan', label: 'Bhutan' },
        { value: 'bolivia', label: 'Bolivia' },
        { value: 'bosnia-and-herzegovina', label: 'Bosnia and Herzegovina' },
        { value: 'botswana', label: 'Botswana' },
        { value: 'brazil', label: 'Brazil' },
        { value: 'brunei', label: 'Brunei' },
        { value: 'bulgaria', label: 'Bulgaria' },
        { value: 'burkina-faso', label: 'Burkina Faso' },
        { value: 'burundi', label: 'Burundi' },
        { value: 'cabo-verde', label: 'Cabo Verde' },
        { value: 'cambodia', label: 'Cambodia' },
        { value: 'cameroon', label: 'Cameroon' },
        { value: 'canada', label: 'Canada' },
        { value: 'central-african-republic', label: 'Central African Republic' },
        { value: 'chad', label: 'Chad' },
        { value: 'chile', label: 'Chile' },
        { value: 'china', label: 'China' },
        { value: 'colombia', label: 'Colombia' },
        { value: 'comoros', label: 'Comoros' },
        { value: 'congo-brazzaville', label: 'Congo (Brazzaville)' },
        { value: 'congo-kinshasa', label: 'Congo (Kinshasa)' },
        { value: 'costa-rica', label: 'Costa Rica' },
        { value: 'croatia', label: 'Croatia' },
        { value: 'cuba', label: 'Cuba' },
        { value: 'cyprus', label: 'Cyprus' },
        { value: 'czechia', label: 'Czechia' },
        { value: 'denmark', label: 'Denmark' },
        { value: 'djibouti', label: 'Djibouti' },
        { value: 'dominica', label: 'Dominica' },
        { value: 'dominican-republic', label: 'Dominican Republic' },
        { value: 'ecuador', label: 'Ecuador' },
        { value: 'egypt', label: 'Egypt' },
        { value: 'el-salvador', label: 'El Salvador' },
        { value: 'equatorial-guinea', label: 'Equatorial Guinea' },
        { value: 'eritrea', label: 'Eritrea' },
        { value: 'estonia', label: 'Estonia' },
        { value: 'eswatini', label: 'Eswatini' },
        { value: 'ethiopia', label: 'Ethiopia' },
        { value: 'fiji', label: 'Fiji' },
        { value: 'finland', label: 'Finland' },
        { value: 'france', label: 'France' },
        { value: 'gabon', label: 'Gabon' },
        { value: 'gambia', label: 'Gambia' },
        { value: 'georgia', label: 'Georgia' },
        { value: 'germany', label: 'Germany' },
        { value: 'ghana', label: 'Ghana' },
        { value: 'greece', label: 'Greece' },
        { value: 'grenada', label: 'Grenada' },
        { value: 'guatemala', label: 'Guatemala' },
        { value: 'guinea', label: 'Guinea' },
        { value: 'guinea-bissau', label: 'Guinea-Bissau' },
        { value: 'guyana', label: 'Guyana' },
        { value: 'haiti', label: 'Haiti' },
        { value: 'honduras', label: 'Honduras' },
        { value: 'hungary', label: 'Hungary' },
        { value: 'iceland', label: 'Iceland' },
        { value: 'india', label: 'India' },
        { value: 'indonesia', label: 'Indonesia' },
        { value: 'iran', label: 'Iran' },
        { value: 'iraq', label: 'Iraq' },
        { value: 'ireland', label: 'Ireland' },
        { value: 'israel', label: 'Israel' },
        { value: 'italy', label: 'Italy' },
        { value: 'jamaica', label: 'Jamaica' },
        { value: 'japan', label: 'Japan' },
        { value: 'jordan', label: 'Jordan' },
        { value: 'kazakhstan', label: 'Kazakhstan' },
        { value: 'kenya', label: 'Kenya' },
        { value: 'kiribati', label: 'Kiribati' },
        { value: 'south-korea', label: 'South Korea' },
        { value: 'kosovo', label: 'Kosovo' },
        { value: 'kuwait', label: 'Kuwait' },
        { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
        { value: 'laos', label: 'Laos' },
        { value: 'latvia', label: 'Latvia' },
        { value: 'lebanon', label: 'Lebanon' },
        { value: 'lesotho', label: 'Lesotho' },
        { value: 'liberia', label: 'Liberia' },
        { value: 'libya', label: 'Libya' },
        { value: 'liechtenstein', label: 'Liechtenstein' },
        { value: 'lithuania', label: 'Lithuania' },
        { value: 'luxembourg', label: 'Luxembourg' },
        { value: 'madagascar', label: 'Madagascar' },
        { value: 'malawi', label: 'Malawi' },
        { value: 'malaysia', label: 'Malaysia' },
        { value: 'maldives', label: 'Maldives' },
        { value: 'mali', label: 'Mali' },
        { value: 'malta', label: 'Malta' },
        { value: 'marshall-islands', label: 'Marshall Islands' },
        { value: 'mauritania', label: 'Mauritania' },
        { value: 'mauritius', label: 'Mauritius' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'micronesia', label: 'Micronesia' },
        { value: 'moldova', label: 'Moldova' },
        { value: 'monaco', label: 'Monaco' },
        { value: 'mongolia', label: 'Mongolia' },
        { value: 'montenegro', label: 'Montenegro' },
        { value: 'morocco', label: 'Morocco' },
        { value: 'mozambique', label: 'Mozambique' },
        { value: 'myanmar', label: 'Myanmar' },
        { value: 'namibia', label: 'Namibia' },
        { value: 'nauru', label: 'Nauru' },
        { value: 'nepal', label: 'Nepal' },
        { value: 'netherlands', label: 'Netherlands' },
        { value: 'new-zealand', label: 'New Zealand' },
        { value: 'nicaragua', label: 'Nicaragua' },
        { value: 'niger', label: 'Niger' },
        { value: 'nigeria', label: 'Nigeria' },
        { value: 'north-macedonia', label: 'North Macedonia' },
        { value: 'norway', label: 'Norway' },
        { value: 'oman', label: 'Oman' },
        { value: 'pakistan', label: 'Pakistan' },
        { value: 'palau', label: 'Palau' },
        { value: 'panama', label: 'Panama' },
        { value: 'papua_new_guinea', label: 'Papua New Guinea' },
        { value: 'paraguay', label: 'Paraguay' },
        { value: 'peru', label: 'Peru' },
        { value: 'philippines', label: 'Philippines' },
        { value: 'poland', label: 'Poland' },
        { value: 'portugal', label: 'Portugal' },
        { value: 'qatar', label: 'Qatar' },
        { value: 'romania', label: 'Romania' },
        { value: 'russia', label: 'Russia' },
        { value: 'rwanda', label: 'Rwanda' },
        { value: 'saint_kitts_and_nevis', label: 'Saint Kitts and Nevis' },
        { value: 'saint_lucia', label: 'Saint Lucia' },
        { value: 'saint_vincent_and_the_grenadines', label: 'Saint Vincent and the Grenadines' },
        { value: 'samoa', label: 'Samoa' },
        { value: 'san_marino', label: 'San Marino' },
        { value: 'sao_tome_and_principe', label: 'Sao Tome and Principe' },
        { value: 'saudi_arabia', label: 'Saudi Arabia' },
        { value: 'senegal', label: 'Senegal' },
        { value: 'serbia', label: 'Serbia' },
        { value: 'seychelles', label: 'Seychelles' },
        { value: 'sierra_leone', label: 'Sierra Leone' },
        { value: 'singapore', label: 'Singapore' },
        { value: 'slovakia', label: 'Slovakia' },
        { value: 'slovenia', label: 'Slovenia' },
        { value: 'solomon_islands', label: 'Solomon Islands' },
        { value: 'somalia', label: 'Somalia' },
        { value: 'south_africa', label: 'South Africa' },
        { value: 'south_sudan', label: 'South Sudan' },
        { value: 'spain', label: 'Spain' },
        { value: 'sri_lanka', label: 'Sri Lanka' },
        { value: 'sudan', label: 'Sudan' },
        { value: 'suriname', label: 'Suriname' },
        { value: 'sweden', label: 'Sweden' },
        { value: 'switzerland', label: 'Switzerland' },
        { value: 'syria', label: 'Syria' },
        { value: 'taiwan', label: 'Taiwan' },
        { value: 'tajikistan', label: 'Tajikistan' },
        { value: 'tanzania', label: 'Tanzania' },
        { value: 'thailand', label: 'Thailand' },
        { value: 'timor_leste', label: 'Timor-Leste' },
        { value: 'togo', label: 'Togo' },
        { value: 'tonga', label: 'Tonga' },
        { value: 'trinidad_and_tobago', label: 'Trinidad and Tobago' },
        { value: 'tunisia', label: 'Tunisia' },
        { value: 'turkey', label: 'Turkey' },
        { value: 'turkmenistan', label: 'Turkmenistan' },
        { value: 'tuvalu', label: 'Tuvalu' },
        { value: 'uganda', label: 'Uganda' },
        { value: 'ukraine', label: 'Ukraine' },
        { value: 'united_arab_emirates', label: 'United Arab Emirates' },
        { value: 'united_kingdom', label: 'United Kingdom' },
        { value: 'united_states', label: 'United States' },
        { value: 'uruguay', label: 'Uruguay' },
        { value: 'uzbekistan', label: 'Uzbekistan' },
        { value: 'vanuatu', label: 'Vanuatu' },
        { value: 'vatican_city', label: 'Vatican City' },
        { value: 'venezuela', label: 'Venezuela' },
        { value: 'vietnam', label: 'Vietnam' },
        { value: 'yemen', label: 'Yemen' },
        { value: 'zambia', label: 'Zambia' },
        { value: 'zimbabwe', label: 'Zimbabwe' }
    ];

    const stateOptions = [
        { value: 'alabama', label: 'Alabama' },
        { value: 'alaska', label: 'Alaska' },
        { value: 'arizona', label: 'Arizona' },
        { value: 'arkansas', label: 'Arkansas' },
        { value: 'california', label: 'California' },
        { value: 'colorado', label: 'Colorado' },
        { value: 'connecticut', label: 'Connecticut' },
        { value: 'delaware', label: 'Delaware' },
        { value: 'florida', label: 'Florida' },
        { value: 'georgia', label: 'Georgia' },
        { value: 'hawaii', label: 'Hawaii' },
        { value: 'idaho', label: 'Idaho' },
        { value: 'illinois', label: 'Illinois' },
        { value: 'indiana', label: 'Indiana' },
        { value: 'iowa', label: 'Iowa' },
        { value: 'kansas', label: 'Kansas' },
        { value: 'kentucky', label: 'Kentucky' },
        { value: 'louisiana', label: 'Louisiana' },
        { value: 'maine', label: 'Maine' },
        { value: 'maryland', label: 'Maryland' },
        { value: 'massachusetts', label: 'Massachusetts' },
        { value: 'michigan', label: 'Michigan' },
        { value: 'minnesota', label: 'Minnesota' },
        { value: 'mississippi', label: 'Mississippi' },
        { value: 'missouri', label: 'Missouri' },
        { value: 'montana', label: 'Montana' },
        { value: 'nebraska', label: 'Nebraska' },
        { value: 'nevada', label: 'Nevada' },
        { value: 'new hampshire', label: 'New Hampshire' },
        { value: 'new jersey', label: 'New Jersey' },
        { value: 'new mexico', label: 'New Mexico' },
        { value: 'new york', label: 'New York' },
        { value: 'north carolina', label: 'North Carolina' },
        { value: 'north dakota', label: 'North Dakota' },
        { value: 'ohio', label: 'Ohio' },
        { value: 'oklahoma', label: 'Oklahoma' },
        { value: 'oregon', label: 'Oregon' },
        { value: 'pennsylvania', label: 'Pennsylvania' },
        { value: 'rhode island', label: 'Rhode Island' },
        { value: 'south carolina', label: 'South Carolina' },
        { value: 'south dakota', label: 'South Dakota' },
        { value: 'tennessee', label: 'Tennessee' },
        { value: 'texas', label: 'Texas' },
        { value: 'utah', label: 'Utah' },
        { value: 'vermont', label: 'Vermont' },
        { value: 'virginia', label: 'Virginia' },
        { value: 'washington', label: 'Washington' },
        { value: 'west virginia', label: 'West Virginia' },
        { value: 'wisconsin', label: 'Wisconsin' },
        { value: 'wyoming', label: 'Wyoming' },
    ];
    

    const customStyle = {
        control: (styles) => ({ ...styles, borderRadius: '10px', backgroundColor: '#FFF5F4', color: 'black', minWidth: '200px', maxWidth: '300px', height: '70px', overflow: 'scroll'})
    }

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [toggleStates, setStates] = useState(false);

    const handleChange = (options) => {
        let destinations = options.map((location) => location.label)
        setSelectedOptions(destinations);
        let foundStates = false;
        for (const locate of destinations) {
            if (locate === 'United States') {
                foundStates = true;
            }
        }
        if (!foundStates) {
            setSelectedStates([]);
        }
        setStates(foundStates);
    };

    const handleStates = (options) => {
        let destinations = options.map((location) => location.label)
        setSelectedStates(destinations);
    }

    useEffect(() => {
        if (!window.sessionStorage.getItem("destination")) {
            window.sessionStorage.setItem('destination', JSON.stringify(selectedOptions));
            window.sessionStorage.setItem('states', JSON.stringify(selectedStates));
        }
        window.sessionStorage.setItem('destination', JSON.stringify(selectedOptions));
        window.sessionStorage.setItem('states', JSON.stringify(selectedStates));
    })
      
    return (
        <>
            <div className={styles.to}>
                To
                    <Select
                        isMulti
                        // isSearchable
                        options={options}
                        className={styles.select}
                        onChange={handleChange}
                        styles={customStyle}
                        components={{
                            ClearIndicator: () => null,
                        }}
                    />
            </div>
            {toggleStates && (
                <div className={styles.to}>
                Select State(s)
                    <Select
                        isMulti
                        // isSearchable
                        options={stateOptions}
                        className={styles.select}
                        onChange={handleStates}
                        styles={customStyle}
                        components={{
                            ClearIndicator: () => null,
                        }}
                    />
                </div>
            )}
        </>
    );
}