export const THINGSPEAK = 'https://api.thingspeak.com/';

export const ThingSpeakWriteAPI = (field) => `update?api_key=FW8F6DEGWF2P9CEG&${field}`;

export const ThingSpeakReadAPI = (field_number) =>
  `channels/1336379/fields/${field_number}/last?api_key=5S084POR0ECOINTN`;

export const GraphsRead = (field_number) =>
  `https://thingspeak.com/channels/1336379/charts/${field_number}?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15`;
