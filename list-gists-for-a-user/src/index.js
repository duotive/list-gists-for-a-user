import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserGists from './Components/UserGists';
import env from "react-dotenv";

import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.request.use(function (config) {
    config.headers.authorization = env.GIT_PERSONAL_ACCESS_TOKEN;
    return config;
});

root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ChakraProvider>
				<UserGists />
			</ChakraProvider>
		</RecoilRoot>
	</React.StrictMode>
);
