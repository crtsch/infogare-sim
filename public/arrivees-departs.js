arrets = document.getElementsByClassName("arrets");

for (const arr of arrets) {
    arr.innerHTML = arr.innerHTML.replaceAll(" . ", `<svg class="sep" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="var(--jaune)"/>
</svg>`);
};