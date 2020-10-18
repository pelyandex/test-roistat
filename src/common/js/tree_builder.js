// Связывает папки между собой в иерархии дерева
function filler (root, child) {
  for (const el of root) {
    if (el.id === child.parentId) {
      el.node.push(child)
      return
    }
    if (el.node.length !== 0) {
      filler(el.node, child)
    }
  }
}

export function treeBuilder (arr = []) {
  if (!(arr instanceof Array) || arr.length === 0) {
    return []
  }
  // Строит узлы
  const filledNodes = arr
    .map(clearNode => (
      {
        ...clearNode,
        node: [],
        show: clearNode.show || false
      }
    ))
  // Все дочернии элементы
  const childNodes = filledNodes.filter(folder => folder.parentId !== null)
  // Все рут-элементы
  const rootNodes = filledNodes.filter(folder => folder.parentId === null)
  // Связываем рут-элементы с дочерними элементами
  childNodes.forEach(el => filler(rootNodes, el))
  return rootNodes
}
