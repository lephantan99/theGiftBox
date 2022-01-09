import { ALL } from './auth'

export const sidebar = {
  config: {},
  groups: [
    {
      name: 'home',
      components: [
        {
          module: 'home', // Module name for localization
          icon: ['fas', 'tachometer-alt'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'index' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
      ],
    },
    {
      name: 'posts-management',
      components: [
        {
          module: 'post', // Module name for localization
          icon: ['fas', 'newspaper'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'posts' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
        {
          module: 'category', // Module name for localization
          icon: ['fas', 'layer-group'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'categories' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
        {
          module: 'tag', // Module name for localization
          icon: ['fas', 'tags'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'tags' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
      ],
    },
    {
      name: 'product-management',
      components: [
        {
          module: 'product', // Module name for localization
          icon: ['fas', 'newspaper'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'products' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
        {
          module: 'category', // Module name for localization
          icon: ['fas', 'layer-group'], // Fontawesome or Element UI icon
          color: 'var(--color-yellow)', // Must be CSS variables
          route: { name: 'productCategories' }, // path or route object ({ name: 'route-name',... })
          permission: ALL, // ALL or match ./auth.js
        },
        // {
        //   module: 'tag', // Module name for localization
        //   icon: ['fas', 'tags'], // Fontawesome or Element UI icon
        //   color: 'var(--color-yellow)', // Must be CSS variables
        //   route: { name: 'tags' }, // path or route object ({ name: 'route-name',... })
        //   permission: ALL, // ALL or match ./auth.js
        // },
      ],
    },
  ],
}
