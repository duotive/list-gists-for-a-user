import axios from "axios";
import moment from "moment";
import React, { useState } from 'react';
import { Box, Heading, Text, Stack, Badge, Skeleton, Divider, Center, Avatar, Link, Flex } from "@chakra-ui/react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const UserGistsListItem = (props) => {

	const { gist, user, gistLanguages } = props;
	const [ data, setData] = useState(false);
	const [ isLoading, setIsLoading] = useState(false);

	const fetchInfo = () => {
		setIsLoading(true);
		axios.get( "https://api.github.com/gists/" + gist.id  )
		.then((response) => {
			setData(response.data);
			setIsLoading(false);
		})
		.catch((error) => {
			setIsLoading(false);
		});

	};


	return (
		<Box>
			<Heading size="sm" marginBottom="5px" onClick={fetchInfo}>
				{user.data.login} / {Object.keys(gist.files)[0]}
			</Heading>
			<Text marginBottom="10px" fontSize="xs">
				Created {moment(gist.created_at).fromNow()}
			</Text>
			<Text marginBottom="20px" fontSize="sm">
				{gist.description}
			</Text>
			{gistLanguages ? (
				<Stack direction='row'>
					{gistLanguages.map((language, index ) => <Badge key={index + language}>{language}</Badge>)}
				</Stack>
			) : null}

			{ isLoading ? (
				<>
					<Center height="30px">
					  <Divider orientation="horizontal" />
					</Center>
					<Skeleton height="20px" />
				</>
			) : (
				data !== false ? (
					<>
						<Center height="30px">
						 	<Divider orientation="horizontal" />
						</Center>
						<Heading as="h4" size="sm">
							Files ({Object.keys(data.files).length})
						</Heading>
						<Center height="20px">
						 	<Divider orientation="horizontal" />
						</Center>
						{Object.keys(data.files).map(function(key, index){
							const file = data.files[key];
							return (
								<>
									<Heading as="h5" size="xs">
										{file.filename}
									</Heading>
									<Center height="10px"></Center>
									<SyntaxHighlighter language={file.language} style={docco}>
										{file.content}
									</SyntaxHighlighter>
									<Center height="20px"></Center>
								</>
							);
						})}
						<Center height="60px">
						 	<Divider orientation="horizontal" />
						</Center>
						<Heading as="h4" size="sm">
							Forks ({data.forks.length})
						</Heading>
						<Center height="20px">
						 	<Divider orientation="horizontal" />
						</Center>
						{data.forks.map(function(fork, index){
							return (
								<>
									<Flex flex="1" gap="4" alignItems="center" flexWrap="wrap" paddingTop="10px" paddingBottom="10px">
										<Avatar
											src={fork.user.avatar_url}
										/>
										<Box>
											{fork.user.name !== null ? fork.user.name + '(' + fork.user.login + ')' : fork.user.login }
										</Box>
										<Box marginLeft="auto">
											<Link href={'https://gist.github.com/' + fork.user.login + '/' + fork.id} isExternal >
												View Fork
											</Link>
										</Box>
									</Flex>
									<Divider orientation="horizontal" />
								</>
							);
						})}
					</>
				) : null
			) }


		</Box>
	);
};

export default UserGistsListItem;
