async function getData(query) {
    // Previously:
    // const result = await db.collection('mycollection').findOne(query);
    // return result;

    // Updated logic with find:
    const results = await db.collection('mycollection').find(query).toArray();
    // If only one document is expected, return it (or null if not found)
    return results.length ? results[0] : null;
}
