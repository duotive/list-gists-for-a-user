import { useRecoilState } from "recoil";
import { userState } from "../../Atoms";

import { Flex, Box, Container, Spacer } from "@chakra-ui/react"

import UserProfile from './UserProfile';
import UserGistsList from './UserGistsList';

const UserLayout = () => {

	const [user] = useRecoilState(userState);

	return user.exists ? (
		<Container maxW="800px" p={10}>
			<Flex alignItems='top' gap='2'>
				<Box width="30%">
					<UserProfile />
				</Box>
				<Spacer />
				<Box width="70%">
					<UserGistsList />
				</Box>
			</Flex>
		</Container>
	) : null;
}

export default UserLayout;
