import { DEFAULT_LAYOUT } from '../base';

import { AppRouteRecordRaw } from '../types';

const QUESTIONBANK: AppRouteRecordRaw = {
  path: '/questionBank',
  name: 'QuestionBank',
  redirect: { name: 'QuestionAll' },
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '题库管理',
    requiresAuth: true,
    icon: 'icon-questionBank',
    order: 4,
    roles: [1],
  },
  children: [
    {
      path: 'all',
      name: 'QuestionAll',
      redirect: { name: 'QuestionBankList' },

      children: [
        {
          path: 'questionBankList',
          name: 'QuestionBankList',
          component: () =>
            import('@/views/questionBank/questionBankList/index.vue'),
          meta: {
            locale: '题库列表',
            requiresAuth: true,
            roles: [1],
            activeMenu: 'QuestionBank',
          },
        },

        {
          path: 'questionList',
          name: 'QuestionList',
          component: () =>
            import('@/views/questionBank/questionList/index.vue'),
          meta: {
            locale: '题目列表',
            requiresAuth: true,
            roles: [1],
            activeMenu: 'QuestionBank',
          },
        },
      ],
    },
  ],
};

export default QUESTIONBANK;
