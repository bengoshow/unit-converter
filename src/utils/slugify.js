export default function slugify(...rest) {
  let newSlug = rest.join('-');
  return newSlug.toLowerCase().replace(/[^a-z0-9-]/gi, '');
}
