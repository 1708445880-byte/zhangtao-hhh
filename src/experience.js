import { projects } from './projects.js';

const projectNotes = {
  'star-tide': '设计模型于大同东南邑美术馆展出。',
  'the-trojans': '剧目微缩模型被国家大剧院舞美博物馆收藏。',
};

// Keep image-backed projects and résumé-only entries in one disclosure.
export const experience = [
  ...projects.map(project => ({
    title: project.title,
    role: project.role || project.type,
    note: projectNotes[project.id] || '',
    projectId: project.id,
  })),
  ...[
    ['新疆喜宴婚礼堂', '灯光设计'],
    ['温都水城 · 水岸艺术区', '街区灯光设计'],
    ['宁波十里红妆博物馆', '场馆灯光'],
    ['中央戏剧学院校园歌手大赛', '舞台灯光设计'],
    ['图兰朵 / 尼伯龙根的指环', '2021 年度院级重点项目 · 剧目还原'],
    ['大戏东望开幕式', '灯光操作'],
    ['西便门古城墙改造项目', '灯光设计'],
    ['三姊妹', '话剧预演'],
    ['2024 北京国际车展', '大众汽车展区 AI 交互区'],
  ].map(([title, role]) => ({ title, role })),
];
