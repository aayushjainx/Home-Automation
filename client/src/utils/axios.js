import axios from 'axios';
import { THINGSPEAK } from './utils';

const thingSpeakAPI = axios.create({
  baseURL: THINGSPEAK,
});

export default thingSpeakAPI;
