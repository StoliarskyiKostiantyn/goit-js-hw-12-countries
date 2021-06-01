export default function fetchImg(searchQuery) {
  return fetch(`https://pixabay.com/api/?21885958-186cb9f8de90f78c5ca194f62&q=${searchQuery}`).then(
    response => response.json(),
  );
}
