module.exports = {
  home: [
    {
      rel: 'user',
      href: '/user',
      type: 'GET'
    },
    {
      rel: 'fish',
      href: '/fish',
      type: 'GET'
    }
  ],
  fish: [
    {
      rel: 'all.fishes',
      href: '/fish/all',
      type: 'GET'
    },
    {
      rel: 'add.fish',
      href: '/fish',
      type: 'POST'
    },
    {
      rel: 'users.all.fish',
      href: '/fish/user',
      type: 'GET'
    },
    {
      rel: 'specific.fish',
      href: '/fish/:id',
      type: 'GET'
    },
    {
      rel: 'update.fish',
      href: '/fish/:id',
      type: 'PUT'
    },
    {
      rel: 'delete.fish',
      href: '/fish/:id',
      type: 'DELETE'
    }
  ],
  user: [
    {
      rel: 'create.user',
      href: '/user/create',
      type: 'POST'
    },
    {
      rel: 'login.user',
      href: '/user/login',
      type: 'POST'
    }
  ]
}
