import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../Atoms";
import { Formik, Field } from "formik";
import { Alert, AlertIcon, Heading, Box, Button, FormControl, FormLabel, FormErrorMessage, Input, VStack, Skeleton } from "@chakra-ui/react";

function Search() {
	const [user, setUser] = useRecoilState(userState);

	return (
		<Box align="center" p={10}>

			<Box maxW="sm" p={6} rounded="md" align="center" borderWidth="1px" borderRadius="lg">

				{ !user.exists && user.username !== '' ? (
					<Alert status="error" align="left" marginBottom="15px">
						<AlertIcon />
						The username does not exist
					</Alert>
				) : null }

				<Heading as='h5' size="sm" align="left" marginBottom="15px">
					Display the gists for a Github user
				</Heading>

				<Formik
					initialValues={{
						username: user.username,
					}}
					onSubmit={(values) => {
						axios.get( "https://api.github.com/users/" + values.username )
						.then((response) => {
							setUser({
								...user,
								data: response.data,
								exists: true,
								isFetching: false,
								username: values.username,
							});
						})
						.catch((error) => {
							setUser({
								...user,
								exists: false,
								isFetching: false
							});
						});
					}}
				>
				{({ handleSubmit, errors, touched }) => (
					<form onSubmit={handleSubmit}>

						<VStack spacing={4} align="flex-start">

							<FormControl isInvalid={!!errors.username && touched.username}>

								<FormLabel htmlFor="username">
									Github Username
								</FormLabel>

								<Field
									as={Input}
									id="username"
									name="username"
									type="username"
									variant="filled"
									disabled={user.isFetching}
									validate={(value) => {
										let error;
										if ( value === '' ) {
											error = "Username is a required field.";
										}
										return error;
									}}
								/>

								<FormErrorMessage>
									{errors.username}
								</FormErrorMessage>

							</FormControl>

							{user.isFetching ? (
								<Skeleton
									height="40px"
									width="100%"
								/>
							) : (
								<Button
									type="submit"
									colorScheme="blue"
									width="full"
								>
									Get Gists
								</Button>
							)}

						</VStack>

					</form>

				)}
			  </Formik>

			</Box>

		</Box>
	);
}

export default Search;
