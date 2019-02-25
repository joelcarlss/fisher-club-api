module.exports = {
  methods: [],
  fish: {
    methods: [
      {
        rel: 'get.all',
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
          rel: 'get.specific',
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
        rel: 'get.all',
        href: '/fish/user',
        type: 'GET'
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
        rel: 'create',
        href: '/user',
        type: 'POST'
      },
      webhook: {
        methods: [
          {
            rel: 'list',
            href: '/user/:id/webhook',
            type: 'GET'
          },
          {
            rel: 'create',
            href: '/user/:id/webhook',
            type: 'POST'
          }
        ],
        id: {
          methods: [
            {
              rel: 'list',
              href: '/user/:id/webhook/:id',
              type: 'GET'
            },
            {
              rel: 'edit',
              href: '/user/:id/webhook/:id',
              type: 'PUT'
            },
            {
              rel: 'delete',
              href: '/user/:id/webhook/:id',
              type: 'DELETE'
            }
          ]
        }
      }
    }
  },
  auth: {
    methods: [
      {
        rel: 'create',
        href: '/auth',
        type: 'POST',
        param: ['username', 'password']
      }
    ]
  }
}
