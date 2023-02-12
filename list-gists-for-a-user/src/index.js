import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserGists from './Components/UserGists';

import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.request.use(function (config) {
    config.headers.authorization = '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';
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
