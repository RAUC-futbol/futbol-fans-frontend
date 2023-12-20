
const teamIdsByLeague = {
  PL: [
    57, 58, 61, 62, 63, 64, 65, 66, 67, 73, 76, 328, 351, 354, 356, 389, 397,
    402, 563, 1044,
  ],
  EC: [
    759,760,765,768,770,773,777,780,782,784,788,798,799,803,805,811,816,827,1065,8601,8873
  ],
  CL: [
    4,5,28,57,65,66,67,78,81,86,92,98,108,110,113,503,524,546,559,610,674,675,721,732,1864,1871,1876,1877,1887,1903,5613,7283
  ],
  FL1: [
    511,512,516,518,521,522,523,524,525,529,533,541,543,545,546,547,548,576
  ],
  BL1: [
    1,2,3,4,5,10,11,12,15,16,17,18,19,28,36,44,55,721
  ],
  SA: [
    98,99,100,102,103,104,107,108,109,110,113,115,445,450,455,470,471,586,5890,5911
  ],
  DED: [
    666,670,671,673,674,675,676,678,679,682,683,684,718,1911,1915,1919,1920,6806
  ],
  PPL: [
    496,498,503,582,583,712,810,1103,1903,5531,5533,5543,5589,5601,5602,5613,6618,9136
  ],
  PD: [
    77,78,79,81,82,83,86,87,89,90,92,94,95,263,264,267,275,298,558,559
  ],
  WC: [
    758,759,760,762,763,764,765,766,769,770,771,772,773,779,780,781,782,788,791,793,794,799,801,802,804,805,815,828,833,840,8030,8601
  ],
  All: [],
};

// Accessing team IDs for the Premier League (PL)
// const premierLeagueTeamIds = teamIdsByLeague['PL'];
// console.log('Team IDs for PL:', premierLeagueTeamIds);

// Use a Set to store unique team IDs
const uniqueTeamIdsSet = new Set();

// Iterate through each league's team IDs and add them to the set
Object.values(teamIdsByLeague).forEach((teamIds) => {
  teamIds.forEach((teamId) => {
    uniqueTeamIdsSet.add(teamId);
  });
});

// Convert the Set back to an array and assign it to the "All" property
teamIdsByLeague.All = [...uniqueTeamIdsSet];

// console.log(teamIdsByLeague.All);
export default teamIdsByLeague;
