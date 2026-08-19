FoodTruckNerdz listed Square locations as trucks owned by a user row. That does not match how real trucks exist: a closed business is still a business, and Square may never be connected.

This change treats `businesses` + `foodTrucks` as the system of record. Square credentials and `squareLocationId` stay optional POS attachments. Unclaimed directory rows are allowed. Closed trucks stay registered and claimable. Find includes closed only when the guest opts in. After about three years a closed listing is delisted (hidden), never deleted. Developers can include delisted rows in `/dev/listings`.

Account close keeps records. Personal-data erasure and listing removal go through `/privacy/deletion-request`. That is not legal advice: the directory is a compilation of a real-world business; personal data is erasable on request; a listing can remain unclaimed unless they also ask for delist.

Memphis seed (idempotent by normalized name), after production Convex deploy:

* The She Shed Food Parlor — closed, unclaimed (public Facebook + May 2023 Square receipt / team thread on Gmail)
* Paper Plate Pavilion — closed, unclaimed (David Self / Chef J; do not use paperplatepavilion.com as the live site)
* Smoke And Rolls — operating, unclaimed (no Gmail thread; public Facebook / Waterworks Ave)

Do not wipe production Convex. Backfill table-by-table. Export Square metadata only (no tokens in git). Instagram/Facebook are a live public bridge for later description drafts, not stored source copies.

Later (not this issue): cheap text models (Gemini Flash, Groq, or xAI) to draft listing copy from public pages. Not an owner onboarding product yet.
