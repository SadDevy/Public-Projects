// const { ProjectsTree } = require('./ProjectsTree.js');


//  let menu = document.getElementById('menu');
//  let tree = new ProjectsTree(menu);
//  tree.createProjectsTree();

// let projects = {
//     "Personal": {
//         "Something": {}
//     },
//     "Work": {},
//     "Errands": {},
//     "Movies to watch": {
//         "Sports": {},
//         "Comedy": {
//             "Family comedy": {},
//             "Teen comedy": {}
//         }
//     },
//     "Shopping": {}
// };

// function createProjectsTree(container, obj) {
//     container.append(createProjectsTreeDom(obj));
//     container.append(createAddProjectPoint());
// }

// function createAddProjectPoint() {
//     let point = document.createElement('a');
//     point.setAttribute('href', '#');
//     point.classList.add('menu__footer');
//     point.classList.add('footer');
//     point.append('Add Project');

//     return point;
// }

// function createProjectsTreeDom(obj) {
//     if (!Object.keys(obj).length)
//         return;

//     let ul = document.createElement('ul');
//     ul.classList.add('menu__projects-list');
//     ul.classList.add('projects-list');

//     for (let key in obj) {
//         let li = document.createElement('li');
//         li.classList.add('projects-list__item');
//         li.innerHTML = key;

//         let linkLi = document.createElement('a');
//         linkLi.setAttribute('href', '#');
//         linkLi.classList.add('projects-list__link');
//         li.prepend(linkLi);
//         linkLi.append(linkLi.nextSibling);

//         let pointSymbol = document.createElement('span');
//         pointSymbol.classList.add('projects-list__point');
//         li.prepend(pointSymbol);

//         let contextMenuLink = document.createElement('a');
//         contextMenuLink.setAttribute('href', '#');
//         contextMenuLink.classList.add('projects-list__context-menu-link');
//         li.append(contextMenuLink);

//         let childrenUl = createProjectsTreeDom(obj[key]);
//         if (childrenUl) {
//             li.append(childrenUl);
//         }

//         if (li.querySelector('ul')) {
//             let link = li.querySelector('.projects-list__link');
//             link.classList.add('projects-list__drop');
//             link.classList.add('projects-list__drop--down');
//         }

//         ul.append(li);
//     }

//     return ul;
// }

// let menu = document.getElementById('menu');
// createProjectsTree(menu, projects);

// let projectsList = document.querySelector('.projects-list');
// projectsList.addEventListener('click', (event) => {
//     selectProjects(event.target.closest('li'));

//     let contextMenuLink = event.target.closest('.projects-list__context-menu-link');
//     if (contextMenuLink) {
//         let contextMenu = contextMenuLink.querySelector('.projects-list__context-menu');
//         if (contextMenu)
//             clearContextMenu();
//         else
//             getContextMenu(contextMenuLink);
//     }

//     let drop = event.target.closest('.projects-list__drop');
//     if (!drop)
//         return;

//     if (!projectsList.contains(drop))
//         return;

//     let currentItem = drop.parentElement;
//     let subItem = currentItem.querySelector('ul');
//     if (subItem)
//         subItem.hidden = !subItem.hidden;

//     drop.classList.toggle('projects-list__drop--down');
// });

// function getContextMenu(link) {
//     let contextMenu = document.createElement('ul');
//     contextMenu.classList.add('projects-list__context-menu');
//     link.append(contextMenu);
// }

// projectsList.addEventListener('mouseover', (event) => {
//     let liElement = event.target.closest('li');

//     if (!liElement)
//         return;

//     if (!projectsList.contains(liElement))
//         return;

//     let contextMenuLink = liElement.querySelector('.projects-list__context-menu-link');
//     contextMenuLink.classList.add('projects-list__context-menu-link--active');

//     let point = liElement.querySelector('.projects-list__point');
//     if (liElement.querySelectorAll('ul').length) {
//         point.classList.add('projects-list__point--nested');
//     }
//     else {
//         point.classList.add('projects-list__point--single');
//     }

//     point.classList.add('projects-list__point--active');
// });

// projectsList.addEventListener('mouseout', (event) => {
//     let liElement = event.target.closest('li');

//     if (!liElement)
//         return;

//     if (!projectsList.contains(liElement))
//         return;

//     let contextMenuLink = liElement.querySelector('.projects-list__context-menu-link');
//     contextMenuLink.classList.remove('projects-list__context-menu-link--active');

//     let point = liElement.querySelector('.projects-list__point');
//     if (liElement.querySelectorAll('ul').length) {
//         point.classList.remove('projects-list__point--nested');
//     }
//     else {
//         point.classList.remove('projects-list__point--single');
//     }

//     point.classList.remove('projects-list__point--active');

//     clearContextMenu();
// });

// function clearContextMenu() {
//     for (let contextMenu of document.querySelectorAll('.projects-list__context-menu')) {
//         contextMenu.remove();
//     }    
// }

// function selectProjects(project) {
//     if (project.tagName !== 'LI')
//         return;

//     for (let item of document.querySelectorAll('.projects-list__item--selected'))
//         item.classList.remove('projects-list__item--selected');

//     project.classList.add('projects-list__item--selected');
// }