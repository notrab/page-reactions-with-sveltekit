import { GraphQLClient } from 'graphql-request';
import type { PageServerLoad, Actions } from './$types';
import { GRAFBASE_API_URL, GRAFBASE_API_KEY } from '$env/static/private';

const client = new GraphQLClient(GRAFBASE_API_URL, {
	headers: {
		'x-api-key': GRAFBASE_API_KEY
	}
});

const PageFragment = /* GraphQL */ `
	fragment Reactions on Page {
		likes
		hearts
		poop
		party
	}
`;

const GetPageByUrl = /* GraphQL */ `
	query GetPageByUrl($url: URL!) {
		page(by: { url: $url }) {
			...Reactions
		}
	}
	${PageFragment}
`;

const CreatePageByUrl = /* GraphQL */ `
	mutation CreatePageByUrl($input: PageCreateInput!) {
		pageCreate(input: $input) {
			page {
				...Reactions
			}
		}
	}
	${PageFragment}
`;

const IncrementByUrl = /* GraphQL */ `
	mutation IncrementByUrl($url: URL!, $input: PageUpdateInput!) {
		pageUpdate(by: { url: $url }, input: $input) {
			page {
				...Reactions
			}
		}
	}
	${PageFragment}
`;

export const load = (async ({ url }) => {
	const { page } = await client.request(GetPageByUrl, {
		url: url.href
	});

	if (!page) {
		const { pageCreate } = await client.request(CreatePageByUrl, {
			input: {
				url: url.href
			}
		});

		return { reactions: pageCreate?.page };
	}

	return {
		reactions: page
	};
}) satisfies PageServerLoad;

type Reaction = 'likes' | 'hearts' | 'poop' | 'party';

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const reaction = data.get('reaction');

		const { page: pageExists } = await client.request(GetPageByUrl, {
			url: url.href
		});

		if (!pageExists) {
			await client.request(CreatePageByUrl, {
				input: {
					url: url.href,
					[reaction as Reaction]: 1
				}
			});

			return { success: true };
		}

		await client.request(IncrementByUrl, {
			url: url.href,
			input: {
				[reaction as Reaction]: {
					increment: 1
				}
			}
		});

		return { success: true };
	}
} satisfies Actions;
