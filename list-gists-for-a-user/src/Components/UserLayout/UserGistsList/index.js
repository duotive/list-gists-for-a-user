import axios from "axios";
import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { userState, userDataGistsState } from "../../../Atoms";

import { Stack, Skeleton, StackDivider, Alert, AlertIcon } from "@chakra-ui/react";
import UserGistsListItem from './UserGistsListItem';

const UserGistsList = () => {

	const [user] = useRecoilState(userState);
	const [userDataGists, setUserDataGists] = useRecoilState(userDataGistsState);

	useEffect(() => {

		setUserDataGists({
			...userDataGists,
			isFetching: true
		});

		axios
			.get("https://api.github.com/users/" + user.username + '/gists')
			.then((response) => {
				setUserDataGists({
					...userDataGists,
					isFetching: false,
					data: response.data
				});
			})
			.catch((error) => {
				setUserDataGists({
					...userDataGists,
					isFetching: false
				});
			});

	}, [user]);

	if ( userDataGists.isFetching ) {
		return (
			<Stack>
				<Skeleton height='20px' />
				<Skeleton height='20px' />
				<Skeleton height='20px' />
			</Stack>
		);
	}

	return userDataGists.data.length ? (
		<Stack divider={<StackDivider />} spacing='4'>
			{userDataGists.data.map(function(gist, i){
				const gistLanguages = [...new Set(Object.keys(gist.files).map(key => gist.files[key].language))];
				return (
					<UserGistsListItem
						index={i}
						key={gist + i}
						user={user}
						gist={gist}
						gistLanguages={gistLanguages}
					/>
				);
			})}
		</Stack>
	) : (
		<Alert status="error" align="left" marginBottom="15px">
			<AlertIcon />
			This user does not have any gists.
		</Alert>
	);
};

export default UserGistsList;
