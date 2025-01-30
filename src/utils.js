export function escapeId(id) {
	// Escapes '.', which is required for querySelector()
    if (id) {
        return id.replace(/\./g, "\\.")
    }
}

export function getEleById(childId, parentId) {
	// When you want to search under a parent

    const parent = document.getElementById(parentId)
    const id = escapeId(childId)
    return parent?.querySelector(`#${id}`)
}

export function searchArrOfObj(arr, id) {
	// Tailored for the structure of nav.json

    for (const element of arr) {
        if (element.id === id) return element
        if (element.children) {
            const result = searchArrOfObj(element.children, id)
            if (result) return result
        }
    }
}