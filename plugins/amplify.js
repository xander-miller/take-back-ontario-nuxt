import { Amplify } from 'aws-amplify';
import config from '../src/amplifyconfiguration.json';

export default defineNuxtPlugin(() => {
	Amplify.configure(config);
})