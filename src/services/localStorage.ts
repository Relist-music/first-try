export function printLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    key
      ? console.log(
          localStorage.key(i) + '=[' + localStorage.getItem(key) + ']',
        )
      : console.log('nothing');
  }
}
