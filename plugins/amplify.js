import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';

export default defineNuxtPlugin(() => {
	Amplify.configure(config);
})