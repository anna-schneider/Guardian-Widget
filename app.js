;(function () {
	let hasLoaded
	let hasData
	let tiles

	function renderTiles() {
		const fragment = new DocumentFragment()

		tiles.forEach((tile) => {
			console.log(JSON.stringify(tile, null, 4))
			const div = document.createElement("div")
			const category = tile.sectionName
				? `<p class="category">${tile.sectionName
						.charAt(0)
						.toUpperCase()}${tile.sectionName.slice(1)} | </p>`
				: ``
			div.innerHTML = `
          <div class="tile-container">
          <a href="${tile.webUrl}"> <img src="${tile.fields.thumbnail}"class="images"></a>
          <a href="${tile.webUrl}" class="name">${tile.webTitle}</a>
          <div class="branding-container">
          <p class="category">${tile.sectionName}</p>
          <a href="${tile.url}" class="branding">${tile.pillarName}</a>
          </div>
          </div>
      `
			fragment.appendChild(div)
		})

		document.getElementById("grid-container").appendChild(fragment)
	}

	async function fetchTileData() {
		const url =
			"https://content.guardianapis.com/search?api-key=f814cd43-7752-4206-9877-b219bcfe0029&show-fields=thumbnail&page-size=9"
		const response = await fetch(url)

		return response.json()
	}

	fetchTileData().then((data) => {
		hasData = true
		tiles = data.response.results
		if (hasLoaded) {
			renderTiles()
		}
	})

	window.addEventListener("DOMContentLoaded", (event) => {
		hasLoaded = true

		if (hasData) {
			renderTiles()
		}
	})
})()
