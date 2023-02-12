import React from "react";

import { useRecoilState } from "recoil";
import { userState } from "../../../Atoms";

import { Flex, Avatar, Box, Heading, Text } from "@chakra-ui/react"

const UserProfile = () => {

	const [user] = useRecoilState(userState);
	
	return (
		<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
			<Avatar
				name={user.data.name}
				src={user.data.avatar_url}
			/>
			<Box>
				<Heading size='sm'>
					{user.data.name}
				</Heading>
				<Text>
					{user.data.login}
				</Text>
			</Box>
			<Text>
				{user.data.bio}
			</Text>
		</Flex>
	);
};

export default UserProfile;
