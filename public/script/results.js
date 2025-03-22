const get = window.location.search.substring(1);
const params = get.split('&');

let uuid;

params.forEach((p) => {
  const values = p.split('=');
  if (values[0] == 'uuid') {
    uuid = values[1];
    const json = JSON.parse(sessionStorage.getItem(values[1]));
    console.log(json);

    const template = document.querySelector('template.result');
    const results = document.querySelector('.results');

    if (json != null) {
      json.forEach((e) => {
        const copy = template.content.cloneNode(true).firstElementChild;
        copy.children[0].innerHTML = e.name;
        copy.children[1].innerHTML = `${new Date(e.start)
          .toLocaleTimeString()
          .substring(0, 5)} - ${new Date(e.end)
          .toLocaleTimeString()
          .substring(0, 5)}`;
        results.children[1].appendChild(copy);
      });
    }

    if (results.children.length < 2) {
      results.innerHTML = '<h2>Uh oh. It seems empty there!</h2>';
    }
  }
});

function goBack() {
  sessionStorage.removeItem(uuid);
  window.location.href = 'index.html';
}
