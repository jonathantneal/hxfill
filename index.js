// assign aria-level to headings
export default (document = window.document) => {
	// sectioning tags matcher
	const sectionMatch = /^(article|aside|nav|section)$/i;

	// heading tag matcher
	const headingMatch = /^h[1-6]$/;

	// assign heading by outline depth
	const assignHeadingByElement = (element) => {
		// default level is 1
		let level = 1;

		// increase the level for each sectioning ancestor
		let ascend = element;

		while (ascend = ascend.parentElement) {
			if (sectionMatch.test(ascend.nodeName)) {
				++level;
			} else if (headingMatch.test(ascend.nodeName)) {
				return;
			}
		}

		// assign the aria-level
		element.setAttribute('aria-level', level);
	};

	// assign headings by document
	Array.prototype.forEach.call(
		document.querySelectorAll('h1,h2,h3,h4,h5,h6'),
		assignHeadingByElement
	);

	// assign levels by mutations
	const assignHeadingsByMutations = (mutations) => mutations.reduce(
		(nodes, mutation) => nodes.concat.apply(nodes, mutation.addedNodes),
		[]
	).reduce(
		(nodes, node) => nodes.concat.apply(
			nodes,
			headingMatch.test(node) ? node : // eslint-disable-line no-nested-ternary
			node.querySelectorAll ? node.querySelectorAll('h1,h2,h3,h4,h5,h6') : []
		),
		[]
	).forEach(assignHeadingByElement);

	new MutationObserver(assignHeadingsByMutations).observe(
		document.documentElement,
		{
			childList: true,
			subtree: true
		}
	);
}
