const tree = document.getElementById('tree');
const form = document.getElementById('formNewFile');

// обернуть все текстовые узлы дерева в <span>
for (let li of tree.querySelectorAll('li')) {
  let span = document.createElement('span');
  li.prepend(span);
  span.append(span.nextSibling);
}

// обработка нажатий по узлам дерева
tree.addEventListener('click', (event) => {
  if (event.target.tagName != 'SPAN') return;

  let childrenContainer = event.target.parentNode.querySelector('ul');
  if (!childrenContainer) return;

  childrenContainer.hidden = !childrenContainer.hidden;
  if (childrenContainer.hidden) hideAllInner(childrenContainer);
});

// обработка отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addNew();
});

// свернуть все внутренние списки
const hideAllInner = (outer) => {
  outer.querySelectorAll('ul').forEach((element) => (element.hidden = true));
};

// добавление нового файла в каталог
const addNew = () => {
  const catalogs = handleInput();
  if (!catalogs) return;

  const len = catalogs.length;
  const targetCatalogUl = descentToLastUl(catalogs);

  if (!getLiWithName(targetCatalogUl, catalogs[len - 1])) {
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = catalogs[len - 1];
    li.append(span);
    targetCatalogUl.append(li);
  }
};

// обработка добавления нового файла
const handleInput = () => {
  const path = document.getElementById('inputNewFile').value;
  if (!path) return alert('Путь не может быть пустым, повторите ввод.');

  const catalogs = path.split('/').filter((catalog) => catalog !== '');
  const len = catalogs.length;

  const last = catalogs[len - 1];
  if (last.indexOf('.') === -1 || last.indexOf('.') === last.length - 1)
    return alert('Файл должен иметь непустое расширение.');

  for (let i = 0; i < len - 1; i++) {
    if (catalogs[i].indexOf('.') !== -1)
      return alert('Файлы не могут содержать другие файлы.');
  }

  return catalogs;
};

// спуститься по пути каталогов вниз
const descentToLastUl = (catalogs) => {
  let current = tree;
  for (let i = 0; i < catalogs.length - 1; i++) {
    current = getUlByName(current, catalogs[i]);
  }
  return current;
};

// возвращает ul, в который будет помещаться файл или каталог
const getUlByName = (outerUl, name) => {
  let li = getLiWithName(outerUl, name);
  if (li) {
    let ul = li.querySelector('ul');
    if (!ul) li.append(document.createElement('ul'));
    return ul;
  }

  const span = document.createElement('span');
  span.textContent = name;
  li = document.createElement('li');
  li.append(span);
  outerUl.append(li);
  let innerUl = document.createElement('ul');
  li.append(innerUl);
  return innerUl;
};

// получить из ul элемент li с нужным именем
const getLiWithName = (outerUl, name) => {
  for (let li of outerUl.children) {
    const text = li.querySelector('span')?.textContent?.trim();
    if (text && text == name) return li;
  }
  return null;
};
