<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="py-12 md:py-32">
	<div class="max-w-3xl mx-auto px-6 space-y-12">
		<div class="prose max-w-none">
			<h1>Instant serverless GraphQL backends</h1>
			<p>
				We are very excited to announce Grafbase, an edge-native data platform for developers. Our
				mission is to dramatically simplify and accelerate the development of GraphQL backends.
			</p>
			<p>
				Grafbase combines GraphQL, Serverless, and Edge Computing to provide a seamless developer
				experience for shipping backends. Go from idea to serverless GraphQL backend in seconds
				without spending time on infrastructure.
			</p>
		</div>

		<div class="text-center">
			<p class="text-sm text-gray-400">Published by Fredrik Björk on July 27</p>
		</div>

		<hr class="w-96 mx-auto" />

		<form method="POST" class="flex items-center justify-center space-x-3">
			<button
				name="reaction"
				type="submit"
				value="likes"
				class="bg-white shadow-sm border border-gray-300 rounded px-2.5 py-1 hover:border-400 focus:bg-gray-100 inline-flex items-center space-x-1.5"
				><span>👍</span><span class="text-sm text-gray-500">{data.reactions.likes}</span></button
			>
			<button
				name="reaction"
				type="submit"
				value="hearts"
				class="bg-white shadow-sm border border-gray-300 rounded px-2.5 py-1 hover:border-400 focus:bg-gray-100 inline-flex items-center space-x-3"
				><span>❤️</span><span class="text-sm text-gray-500">{data.reactions.hearts}</span>
			</button>
			<button
				name="reaction"
				type="submit"
				value="poop"
				class="bg-white shadow-sm border border-gray-300 rounded px-2.5 py-1 hover:border-400 focus:bg-gray-100 inline-flex items-center space-x-3"
				><span>💩</span><span class="text-sm text-gray-500">{data.reactions.poop}</span>
			</button>
			<button
				name="reaction"
				type="submit"
				value="party"
				class="bg-white shadow-sm border border-gray-300 rounded px-2.5 py-1 hover:border-400 focus:bg-gray-100 inline-flex items-center space-x-3"
			>
				<span>🎉</span><span class="text-sm text-gray-500">{data.reactions.party}</span>
			</button>
		</form>
	</div>
</div>
