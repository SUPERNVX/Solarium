export interface Moon {
    name: string;
    distance: string; // Used for trajectory sizing
    type: string; // 'm', 'd', 'p', 'lop', 'eu', 'ga', 'ti', 'di', 'enc', 'mir', 'ari', 'umb', 'tri', 'pro', 'ner'
}

export interface PlanetData {
    id: string;
    name: string;
    distanceAU: string;
    briefDescription: string;
    fullDescription: string[];
    textureUrl: string;
    landscapeUrl: string;
    color: string;
    shadowColor: string;
    glowColor: string;
    moons: Moon[];
}

export const PLANETS: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        distanceAU: '0.39 AU',
        briefDescription: 'The closest planet to the sun. It circles the sun faster than all the other planets, which is why Romans named it after their swift-footed messenger god.',
        fullDescription: [
            'Mercury is the closest planet to the sun. As such, it circles the sun faster than all the other planets, which is why Romans named it after their swift-footed messenger god.',
            'The Sumerians also knew of Mercury since at least 5,000 years ago. It was often associated with Nabu, the god of writing. Mercury was also given separate names for its appearance as both a morning star and as an evening star. Greek astronomers knew, however, that the two names referred to the same body, and Heraclitus, around 500 B.C., correctly thought that both Mercury and Venus orbited the sun, not Earth.',
            'A year on Mercury is just 88 days long. One solar day (the time from noon to noon on the planet’s surface) on Mercury lasts the equivalent of 176 Earth days while the sidereal day (the time for 1 rotation in relation to a fixed point) lasts 59 Earth days.',
            'Mercury is the smallest planet in the Solar System. One of five planets visible with the naked eye, Mercury is just 4,879 Kilometres across its equator, compared with 12,742 Kilometres for the Earth.',
        ],
        textureUrl: '/mercury.webp',
        landscapeUrl: 'https://i2.wp.com/www.astronomytrek.com/wp-content/uploads/2012/11/mercury-1.jpg?fit=678%2C381&ssl=1',
        color: '#E8927C',
        shadowColor: 'rgba(188, 143, 127, 0.6)',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [],
    },
    {
        id: 'venus',
        name: 'Venus',
        distanceAU: '0.723 AU',
        briefDescription: 'Named for the Roman goddess of love and beauty. In ancient times, Venus was often thought to be two different stars, the evening star and the morning star.',
        fullDescription: [
            'Venus, the second planet from the sun, is named for the Roman goddess of love and beauty. The planet — the only planet named after a female — may have been named for the most beautiful deity of her pantheon because it shone the brightest of the five planets known to ancient astronomers.',
            'In ancient times, Venus was often thought to be two different stars, the evening star and the morning star — that is, the ones that first appeared at sunset and sunrise. In Latin, they were respectively known as Vesper and Lucifer.',
            'A day on Venus lasts longer than a year. It takes 243 Earth days to rotate once on its axis (sidereal day). The planet’s orbit around the Sun takes 225 Earth days.',
            'Atmospheric pressure on Venus is 92 times greater than the Earth’s. While its size and mass are similar to Earth, the pressure felt by a human on the surface would be equivalent to that experienced deep beneath the sea on Earth.',
        ],
        textureUrl: '/venus.webp',
        landscapeUrl: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2014/2-whatistheave.jpg',
        color: '#b45d15',
        shadowColor: '#b85a07',
        glowColor: '#ffcb9c',
        moons: [],
    },
    {
        id: 'earth',
        name: 'Earth',
        distanceAU: '1 AU',
        briefDescription: 'Earth, our home. It is the only planet known to have an atmosphere containing free oxygen, oceans of liquid water on its surface, and, of course, life.',
        fullDescription: [
            'Earth, our home, is the third planet from the sun. It is the only planet known to have an atmosphere containing free oxygen, oceans of liquid water on its surface, and, of course, life.',
            'The Earth’s rotation is gradually slowing. This deceleration is happening almost imperceptibly, at approximately 17 milliseconds per hundred years.',
            'The Earth was once believed to be the centre of the universe. Due to the apparent movements of the Sun and planets in relation to their viewpoint, ancient scientists insisted that the Earth remained static.',
            'There is only one natural satellite of the planet Earth. As a percentage of the size of the body it orbits, the Moon is the largest satellite of any planet in our solar system.',
        ],
        textureUrl: '/earth.webp',
        landscapeUrl: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350',
        color: '#26daaa',
        shadowColor: '#7894a9',
        glowColor: '#8cbaff',
        moons: [
            { name: 'Moon', distance: 'm', type: 'm' },
        ],
    },
    {
        id: 'mars',
        name: 'Mars',
        distanceAU: '1.524 AU',
        briefDescription: 'Fourth planet from the Sun and the second smallest planet in the solar system. Named after the Roman god of war often described as the “Red Planet”.',
        fullDescription: [
            'Mars is the fourth planet from the sun. Befitting the red planet\'s bloody color, the Romans named it after their god of war.',
            'Mars and Earth have approximately the same landmass. Even though Mars has only 15% of the Earth’s volume and just over 10% of the Earth’s mass, around two thirds of the Earth’s surface is covered in water.',
            'Mars is home to the tallest mountain in the solar system. Olympus Mons, a shield volcano, is 21km high and 600km in diameter.',
            'Mars has the largest dust storms in the solar system. They can last for months and cover the entire planet.',
        ],
        textureUrl: '/mars.webp',
        landscapeUrl: 'https://1.bp.blogspot.com/-ou7Je3OVg6U/WYtxDqjNp_I/AAAAAAAACSQ/fsopS5VtFg4bmlv8hQNfiRYfJqTygCotQCLcBGAs/s2048/Martian%2Blandscape%2Bby%2BAmante%2BLombardi.jpg',
        color: '#e55f45',
        shadowColor: '#6b261a',
        glowColor: '#e86363',
        moons: [
            { name: 'Deimos', distance: 'd', type: 'd' },
            { name: 'Phoebos', distance: 'p', type: 'p' },
        ],
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        distanceAU: '5.203 AU',
        briefDescription: 'Jupiter is the largest planet in the solar system. Fittingly, it was named after the king of the gods in Roman mythology.',
        fullDescription: [
            'Jupiter is the largest planet in the solar system. Fittingly, it was named after the king of the gods in Roman mythology.',
            'Jupiter helped revolutionize the way we saw the universe and ourselves in 1610, when Galileo discovered Jupiter\'s four large moons — Io, Europa, Ganymede and Callisto.',
            'Jupiter is the fourth brightest object in the solar system. Only the Sun, Moon and Venus are brighter.',
            'Jupiter has the shortest day of all the planets. It turns on its axis once every 9 hours and 55 minutes.',
        ],
        textureUrl: '/jupiter.webp',
        landscapeUrl: 'http://hanaleikauaivacation.com/wp-content/uploads/parser/jupiter-landscape-1.jpg',
        color: 'orange',
        shadowColor: 'rgba(188, 143, 127, 0.6)',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [
            { name: 'Io', distance: 'lop', type: 'lop' },
            { name: 'Europa', distance: 'eu', type: 'eu' },
            { name: 'Ganymede', distance: 'ga', type: 'ga' },
        ],
    },
    {
        id: 'saturn',
        name: 'Saturn',
        distanceAU: '9.539 AU',
        briefDescription: 'Saturn is the sixth planet from the sun and the second largest planet in the solar system. Saturn was the Roman name for Cronus, the lord of the Titans.',
        fullDescription: [
            'Saturn is the sixth planet from the sun and the second largest planet in the solar system. Saturn was the Roman name for Cronus, the lord of the Titans in Greek mythology.',
            'Saturn is the farthest planet from Earth visible to the naked human eye, but it is through a telescope that the planet\'s most outstanding features can be seen: Saturn\'s rings.',
            'Saturn can be seen with the naked eye. It is the fifth brightest object in the solar system and is also easily studied through binoculars or a small telescope.',
            'Saturn is the flattest planet. Its polar diameter is 90% of its equatorial diameter, this is due to its low density and fast rotation.',
        ],
        textureUrl: '/saturn.webp',
        landscapeUrl: 'http://ak0.picdn.net/shutterstock/videos/4049260/thumb/1.jpg',
        color: '#b29d81',
        shadowColor: 'rgba(188, 143, 127, 0.6)',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [
            { name: 'Titan', distance: 'ti', type: 'ti' },
            { name: 'Dione', distance: 'di', type: 'di' },
            { name: 'Enceladus', distance: 'enc', type: 'enc' },
        ],
    },
    {
        id: 'uranus',
        name: 'Uranus',
        distanceAU: '19.18 AU',
        briefDescription: 'The first planet to be discovered by scientists. The planet is notable for its dramatic tilt, which causes its axis to point nearly directly at the sun.',
        fullDescription: [
            'Uranus is the seventh planet from the sun and the first to be discovered by scientists. Although Uranus is visible to the naked eye, it was long mistaken as a star because of the planet\'s dimness.',
            'British astronomer William Herschel discovered Uranus accidentally on March 13, 1781, with his telescope while surveying all stars.',
            'Uranus turns on its axis once every 17 hours, 14 minutes. The planet rotates in a retrograde direction, opposite to the way Earth and most other planets turn.',
            'Uranus is often referred to as an “ice giant” planet. Like the other gas giants, it has a hydrogen upper layer, which has helium mixed in.',
        ],
        textureUrl: '/uranus.webp',
        landscapeUrl: 'http://www.cosmosup.com/wp-content/uploads/2016/02/Uranus-Facts-About-the-Planet-Uranus-700x325.jpg',
        color: '#8dcdd8',
        shadowColor: 'rgba(127, 188, 171, 0.6)',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [
            { name: 'Miranda', distance: 'mir', type: 'mir' },
            { name: 'Ariel', distance: 'ari', type: 'ari' },
            { name: 'Umbriel', distance: 'umb', type: 'umb' },
        ],
    },
    {
        id: 'neptune',
        name: 'Neptune',
        distanceAU: '30.06 AU',
        briefDescription: 'It was the first planet to get its existence predicted by mathematical calculations before it was actually seen through a telescope on Sept. 23, 1846.',
        fullDescription: [
            'Neptune is the eighth planet from the sun. It was the first planet to get its existence predicted by mathematical calculations before it was actually seen through a telescope on Sept. 23, 1846.',
            'Only one mission has flown by Neptune – Voyager 2 in 1989 – meaning that astronomers have done most studies using ground-based telescopes.',
            'Neptune was not known to the ancients. It is not visible to the naked eye and was first observed in 1846. Its position was determined using mathematical predictions.',
            'Neptune spins on its axis very rapidly. Its equatorial clouds take 18 hours to make one rotation. This is because Neptune is not solid body.',
        ],
        textureUrl: '/neptune.webp',
        landscapeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8Dd14tbXAzh1iz-EJl9tulRwH7Bb-SxX6sXpKFDbqb-NKwpE',
        color: '#4f83e2',
        shadowColor: '#2d4153',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [
            { name: 'Triton', distance: 'tri', type: 'tri' },
            { name: 'Proteus', distance: 'pro', type: 'pro' },
            { name: 'Nereid', distance: 'ner', type: 'ner' },
        ],
    },
    {
        id: 'pluto',
        name: 'Pluto',
        distanceAU: '39.5 AU',
        briefDescription: 'Pluto, once considered the ninth and most distant planet from the sun, is now the largest known dwarf planet in the solar system.',
        fullDescription: [
            'Pluto, once considered the ninth and most distant planet from the sun, is now the largest known dwarf planet in the solar system.',
            'In 2006, Pluto was reclassified as a dwarf planet, a change widely thought of as a demotion.',
            'Pluto is named after the Greek god of the underworld. This is a later name for the more well known Hades and was proposed by Venetia Burney.',
            'Pluto was reclassified from a planet to a dwarf planet in 2006. This is when the IAU formalised the definition of a planet.',
        ],
        textureUrl: '/pluto.webp',
        landscapeUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/asd.jpeg',
        color: '#FF8732',
        shadowColor: '#2d4153',
        glowColor: 'rgba(234, 205, 199, 0.6)',
        moons: [],
    },
];
