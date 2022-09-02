const steps = [
  {
    element: '.nav-container',
    popover: {
      title: 'Start Guide: ',
      description: "click mask or 'close' btn to close, and you can press space to next quickly!",
      position: 'bottom'
    }
  }, {
    element: '#logo-container',
    stageBackground: 'transparent',
    popover: {
      className: 'logo-popover',
      title: 'Logo',
      description: 'So nice the Logo !',
      position: 'right'
    }
  }, {
    element: '#sideBar-menu',
    stageBackground: 'transparent',
    popover: {
      className: 'sideBar-popover',
      title: 'Menu',
      description: 'Click here to go to the menu item with permission!',
      position: 'right'
    }
  }, {
    element: '#hamburger-container',
    popover: {
      title: 'Hamburger',
      description: 'to collapse or expand the SideBar',
      position: 'bottom'
    }
  }, {
    element: '#reload-container',
    popover: {
      title: 'reload',
      description: 'to reRender this system',
      position: 'bottom'
    }
  }, {
    element: '#breadcrumb-container',
    popover: {
      title: 'BreadCrumb',
      description: 'the navigation of the system',
      position: 'bottom'
    }
  }, {
    element: '#header-search',
    popover: {
      title: 'HeaderSearch',
      description: 'search for pages',
      position: 'bottom'
    }
  }, {
    element: '#github',
    popover: {
      title: 'My Github',
      description: 'My personal github address, welcome!',
      position: 'left'
    }
  }, {
    element: '#language',
    popover: {
      title: 'Local Language',
      description: 'Chinese and English are selectable!',
      position: 'left'
    }
  }, {
    element: '#screenFull',
    popover: {
      title: 'FullScreen',
      description: 'Change the full screen make good feeling!',
      position: 'left'
    }
  }, {
    element: '#lock',
    popover: {
      title: 'LockScreen',
      description: 'Lock the screen for security!',
      position: 'left'
    }
  }, {
    element: '#personal',
    popover: {
      title: 'My Personal Avatar',
      description: 'Click here you can see personal information!',
      position: 'left'
    }
  }, {
    element: '#setting',
    popover: {
      title: 'Global Settings',
      description: 'The global settings you can see by click it!',
      position: 'left'
    }
  }, {
    element: '#tagsView-container',
    popover: {
      title: 'TagsView',
      description: 'Be able to setting show or not, and you can click to new menu!',
      position: 'bottom'
    }
  }
]

export default steps
