module.exports = {
  methods: [],
  auth: {
    methods: [
      {
        rel: 'create',
        href: '/auth',
        type: 'POST',
        param: ['username', 'password']
      }
    ]
  },
  fish: {
    methods: [
      {
        rel: 'list',
        href: '/fish',
        type: 'GET'
      },
      {
        rel: 'create',
        href: '/fish',
        type: 'POST'
      }
    ],
    id: {
      methods: [
        {
          rel: 'list.specific',
          href: '/fish/:id',
          type: 'GET'
        },
        {
          rel: 'update.specific',
          href: '/fish/:id',
          type: 'PUT'
        },
        {
          rel: 'delete.specific',
          href: '/fish/:id',
          type: 'DELETE'
        }
      ]
    },
    user: {
      methods: [],
      id: {
        method: [
          {
            rel: 'list',
            href: '/fish/:id/user',
            type: 'GET'
          }
        ]
      }
    }
  },
  user: {
    methods: [
      {
        rel: 'list',
        href: '/user',
        type: 'GET'
      },
      {
        rel: 'create',
        href: '/user',
        type: 'POST',
        param: ['username', 'password']
      }
    ],
    id: {
      method: {
        rel: 'list.specific',
        href: '/user/:id',
        type: 'GET'
      }
    }
  },
  webhook: {
    methods: [
      {
        rel: 'list',
        href: '/webhook',
        type: 'POST'
      }
    ],
    id: {
      methods: [
        {
          rel: 'list',
          href: '/webhook/:id',
          type: 'GET'
        },
        {
          rel: 'edit',
          href: '/webhook/:id',
          type: 'PUT'
        },
        {
          rel: 'delete',
          href: '/webhook/:id',
          type: 'DELETE'
        }
      ]
    },
    user: {
      methods: [],
      id: {
        methods: [
          {
            rel: 'list',
            href: '/webhook/user/:id',
            type: 'GET'
          }
        ]
      }
    }
  }
}
