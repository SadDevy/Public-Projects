function ProjectsTree(container, projects) {
    let self = this;

    self.createProjectsTree = () => {
        container.append(createMenuTitle());
        container.append(createListDom(projects));
        container.append(createAddProjectPoint());
    };

    function createMenuTitle() {
        let title = document.createElement('div');
        title.classList.add('menu__title');
        title.classList.add('title');
        title.append('Projects');

        return title;
    }

    function createAddProjectPoint() {
        let point = document.createElement('a');
        point.setAttribute('href', '#');
        point.classList.add('menu__footer');
        point.classList.add('footer');
        point.append('Add Project');

        return point;
    }

    function createListDom(obj) {
        if (!Object.keys(obj).length)
            return;

        let ul = createUl();

        for (let key in obj) {
            let li = createLi(key, obj[key]);

            ul.append(li);
        }

        return ul;
    }

    function createUl() {
        let ul = document.createElement('ul');
        ul.classList.add('menu__projects-list');
        ul.classList.add('projects-list');

        return ul;
    }

    function createLi(key, property) {
        let li = document.createElement('li');
        li.classList.add('projects-list__item');
        li.innerHTML = key;

        let contextMenuLink = createContextMenuLink();
        li.append(contextMenuLink);

        let childUl = createListDom(property);
        if (childUl) {
            li.append(childUl);
        }

        let linkLi = createLinkLi(li);
        li.prepend(linkLi);
        linkLi.append(linkLi.nextSibling);

        let point = createPoint();
        li.prepend(point);

        return li;
    }

    function createLinkLi(liElement) {
        let linkLi = document.createElement('a');
        linkLi.setAttribute('href', '#');
        linkLi.classList.add('projects-list__link');

        if (liElement.querySelector('ul')) {
            linkLi.classList.add('projects-list__drop');
            linkLi.classList.add('projects-list__drop--down');
        }

        return linkLi;
    }

    function createPoint() {
        let point = document.createElement('span');
        point.classList.add('projects-list__point');

        return point;
    }

    function createContextMenuLink() {
        let contextMenuLink = document.createElement('a');
        contextMenuLink.setAttribute('href', '#');
        contextMenuLink.classList.add('projects-list__context-menu-link');

        return contextMenuLink;
    }

    container.onclick = (event) => {
        let li = event.target.closest('li');

        createAlert(event.target);
        createModalWindow(event.target);

        selectProjects(li);

        dropContextMenu(event.target);

        dropItems(event.target);

        clearContextAll();

        event.preventDefault();
    };

    function createModalWindow(target) {
        let contextItem = target.closest('.context-menu__item');
        if (!contextItem)
            return;

        if (contextItem.firstChild.firstChild.data !== 'Confirm')
            return;

        let body = document.body;
        let modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-window');

        let modalTitle = document.createElement('div');
        modalTitle.classList.add('modal-window__title');

        let modalCloseBtn = document.createElement('a');
        modalCloseBtn.setAttribute('href', '#');
        modalCloseBtn.classList.add('modal-window__closeBtn');

        modalTitle.append('Delete project');
        modalTitle.append(modalCloseBtn);
        modalContainer.append(modalTitle);

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-window__content');

        let modalCancelBtn = document.createElement('a');
        modalCancelBtn.setAttribute('href', '#');
        modalCancelBtn.classList.add('modal-window__cancelBtn');
        modalCancelBtn.append('Cancel');

        let modalDeleteBtn = document.createElement('a');
        modalDeleteBtn.setAttribute('href', '#');
        modalDeleteBtn.classList.add('modal-window__deleteBtn');
        modalDeleteBtn.append('Delete Project');

        modalContent.append(`Are you sure you want to delete project "${contextItem.parentElement.firstChild.firstChild.firstChild.data}"?`);
        modalContent.append(modalCancelBtn);
        modalContent.append(modalDeleteBtn);

        modalContainer.append(modalContent);

        body.prepend(modalContainer);

        let contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');
        contentContainer.disabled = true;
        body.prepend(contentContainer);
        contentContainer.append(contentContainer.nextSibling);
    }

    document.body.onclick = (event) => {
        let modal = event.target.closest('.modal-window');
        if (!modal)
            return;
        let modalClose = modal.querySelector('.modal-window__closeBtn');

        if (!modalClose)
            return;

        modal.remove();
    };

    container.parentElement.onclick = (event) => {
        let alert = event.target.closest('.alert__closeBtn');
        if (!alert)
            return;

        alert.parentElement.remove();
    };

    function createAlert(target) {
        let contextItem = target.closest('.context-menu__item');
        if (!contextItem)
            return;

        if (contextItem.firstChild.firstChild.data !== 'Alert')
            return;

        let container = menu.parentElement;
        let alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add('menu__alert');
        alert.append('You won\'t be able to create new projects because you have reached you project limit.');

        let closeBtn = document.createElement('a');
        closeBtn.setAttribute('href', '#');
        closeBtn.classList.add('alert__closeBtn');
        alert.append(closeBtn);

        container.prepend(alert);
    }

    function clearContextAll() {
        let li = document.querySelectorAll('.projects-list__item');
        for (let l of li) {
            if (!l.classList.contains('projects-list__item--selected')) {
                let point = l.querySelector('.projects-list__point');
                if (point.classList.contains('projects-list__point--active'))
                    point.classList.remove('projects-list__point--active');

                let link = l.querySelector('.projects-list__context-menu-link');
                if (link.classList.contains('projects-list__context-menu-link--active'))
                    link.classList.remove('projects-list__context-menu-link--active');

                let contextMenu = link.querySelector('.projects-list__context-menu');
                if (contextMenu)
                    contextMenu.remove();
            }
        }
    }

    function dropItems(target) {
        let drop = target.closest('.projects-list__drop');
        if (!drop)
            return;

        let projectsList = document.querySelector('.projects-list');
        if (!projectsList.contains(drop))
            return;

        let currentItem = drop.parentElement;
        let subItem = currentItem.querySelector('ul');
        if (subItem)
            subItem.hidden = !subItem.hidden;

        drop.classList.toggle('projects-list__drop--down');
    }

    function dropContextMenu(target) {
        let link = target.closest('.projects-list__context-menu-link');
        if (link) {
            let contextMenu = link.querySelector('.projects-list__context-menu');
            contextMenu ? clearContextMenu()
                : renderContextMenu(link);
        }
    }

    function renderContextMenu(link) {
        let contextMenu = document.createElement('ul');
        contextMenu.classList.add('projects-list__context-menu');
        contextMenu.classList.add('context-menu');

        link.append(contextMenu);

        renderAllLi(contextMenu);
    }

    function renderAllLi(menu) {
        let lines = [];
        let currentItem = menu.parentElement.parentElement;
        let currentLink = currentItem.querySelector('.projects-list__link');
        let currentText = currentLink.firstChild.data;
        lines.push(currentText);

        let i = 1;
        let level = getItemLevel(currentItem, i);
        lines.push('Level: ' + level);

        lines.push('Confirm');
        lines.push('Alert');

        for (let line of lines) {
            renderLi(line, menu);
        }
    }

    function getItemLevel(currentItem, i) {
        if (!currentItem.parentElement.parentElement.classList.contains('projects-list__item'))
            return i;

        return getItemLevel(currentItem.parentElement.parentElement, ++i);
    }

    function renderLi(line, menu) {
        let li = document.createElement('li');
        li.classList.add('context-menu__item');
        let a = document.createElement('a');
        a.setAttribute('href', '#');
        a.classList.add('context-menu__link');
        li.prepend(a);
        li.append(line);
        a.append(a.nextSibling);
        menu.append(li);
    }

    function selectProjects(project) {
        if (project.tagName !== 'LI')
            return;

        for (let item of document.querySelectorAll('.projects-list__item--selected'))
            item.classList.remove('projects-list__item--selected');

        project.classList.add('projects-list__item--selected');
    }

    container.onmouseover = (event) => {
        let liElement = event.target.closest('li');

        if (!liElement)
            return;

        if (!container.contains(liElement))
            return;

        activeContextMenuLink(liElement);

        activePoints(liElement);
    };

    function activeContextMenuLink(liElement) {
        let contextMenuLink = liElement.querySelector('.projects-list__context-menu-link');
        if (contextMenuLink)
            contextMenuLink.classList.add('projects-list__context-menu-link--active');
    }

    function activePoints(liElement) {
        let point = liElement.querySelector('.projects-list__point');
        if (!point)
            return;

        if (liElement.querySelectorAll('ul').length) {
            point.classList.add('projects-list__point--nested');
        }
        else {
            point.classList.add('projects-list__point--single');
        }

        point.classList.add('projects-list__point--active');
    }

    container.onmouseout = (event) => {
        let liElement = event.target.closest('li');

        if (!liElement)
            return;

        if (liElement.classList.contains('projects-list__item--selected'))
            return;

        if (!container.contains(liElement))
            return;

        inactiveContextMenuLink(liElement);

        inactivePoints(liElement);
    };

    function clearContextMenu() {
        for (let contextMenu of document.querySelectorAll('.projects-list__context-menu')) {
            contextMenu.remove();
        }
    }

    function inactiveContextMenuLink(liElement) {
        let contextMenuLink = liElement.querySelector('.projects-list__context-menu-link');
        if (contextMenuLink)
            contextMenuLink.classList.remove('projects-list__context-menu-link--active');
    }

    function inactivePoints(liElement) {
        let point = liElement.querySelector('.projects-list__point');
        if (!point)
            return;

        if (liElement.querySelectorAll('ul').length) {
            point.classList.remove('projects-list__point--nested');
        }
        else {
            point.classList.remove('projects-list__point--single');
        }

        point.classList.remove('projects-list__point--active');
    }
}