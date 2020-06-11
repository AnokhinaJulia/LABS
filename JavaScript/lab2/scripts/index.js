let tree = document.getElementById('tree');

// обернуть все текстовые узлы дерева в <span>
for (let li of tree.querySelectorAll('li')) {
  let span = document.createElement('span');
  li.prepend(span);
  span.append(span.nextSibling);
}

const hideAllInner = (outer) => {
  outer.querySelectorAll('ul').forEach((element) => (element.hidden = true));
};

// обработка нажатий по узлам дерева
tree.addEventListener('click', (event) => {
  if (event.target.tagName != 'SPAN') return;

  let childrenContainer = event.target.parentNode.querySelector('ul');
  if (!childrenContainer) return;

  childrenContainer.hidden = !childrenContainer.hidden;
  if (childrenContainer.hidden) hideAllInner(childrenContainer);
});
