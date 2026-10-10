const seq = (prefix, count) => Array.from({ length: count }, (_, i) => `/images/${prefix}-${i + 1}.webp`);
export const projects = [
  { id: 'qingshan-zhengjie', title: '青山正街', en: 'Qingshan Zhengjie', category: 'lighting', label: '街区灯光', type: '武汉 · 园区灯光预演', cover: '/images/c04-2.webp', images: [...seq('c04', 4), ...seq('c05', 4), ...seq('c06', 4), ...seq('d01', 3)], description: '围绕主塔、休闲区与时光塔进行灯光预演设计。图库前 12 张为预演图，最后 3 张为作品集收录的街区实拍。', role: '园区灯光预演设计。', source: '作品集 · 第 3–7 页', caption: i => i < 12 ? '灯光预演' : '街区实拍' },
  { id: 'star-tide', title: '星海之汐', en: 'Star Tide', category: 'previsualization', label: '舞美预演', type: '课内跨年晚会设计预演', cover: '/images/a01-1.webp', images: [...seq('a01', 4), ...seq('a02', 2)], description: '以跨年晚会为场景的课内设计预演，从模型制作到灯光与动画，呈现完整的舞台视觉方案。', role: '模型制作、动画关键帧、灯光编程、视频输出，均由个人完成。', tools: 'Blender / Unreal Engine 5 / Depence / After Effects', source: '作品集 · 第 13–14 页' },
  { id: 'guangan-night', title: '广安奇妙夜', en: 'A Night in Guang’an', category: 'lighting', label: '船游灯光', type: '文旅船游 · 灯光设计与前期方案', cover: '/images/a03-2.webp', images: [...seq('a03', 4), ...seq('a04', 4), ...seq('a05', 3), ...seq('a06', 4), ...seq('a07', 3)], description: '文旅船游项目的视觉效果、前期舞美方案、灯光效果与 CAD 灯位图。前期环节设计图使用 Photoshop 与三维软件合成制作。', role: '前期环节舞美设计；现场灯光设计与编程。', tools: 'Photoshop / 三维软件 / CAD 灯位图', source: '作品集 · 第 3、15–19 页', caption: i => i < 8 ? '船游视觉' : i < 11 ? '前期舞美方案' : i < 17 ? '灯光效果' : 'CAD 灯位图' },
  { id: 'poetry-in-light', title: '光影织诗', en: 'Poetry in Light', category: 'lighting', label: '灯光设计', type: '温都水城灯光秀', cover: '/images/a09-2.webp', images: [...seq('a09', 4), ...seq('a10', 3), ...seq('a11', 5)], description: '温都水城灯光秀，从前期灯位规划、预演编程到现场还原。', role: '前期灯位图、灯光预演编程与现场还原。', source: '作品集 · 第 21–23 页', caption: i => i < 4 ? '光影秀画面' : i < 7 ? '灯光预演' : '灯位图' },
  { id: 'victory-of-justice', title: '正义必胜', en: 'Victory of Justice', category: 'previsualization', label: '灯光草图', type: '人民大会堂文艺汇演', cover: '/images/b02-1.webp', images: [...seq('a12', 4), ...seq('b01', 4), ...seq('b02', 4)], description: '反法西斯战争胜利 80 周年文艺汇演的演出画面、舞台视觉与灯光草图。', caption: i => i < 4 ? '演出画面' : i < 8 ? '舞台视觉' : '灯光草图', source: '作品集 · 第 26 页' },
  { id: 'xiushan-water-show', title: '四川秀山水幕秀', en: 'Water & Light', category: 'lighting', label: '灯光设计图', type: '水幕秀', cover: '/images/a08-2.webp', images: seq('a08', 3), description: '水幕秀灯光设计图。', source: '作品集 · 第 20 页' },
  { id: 'xufu-voyage', title: '徐福东渡', en: 'The Voyage of Xu Fu', category: 'previsualization', label: '灯光预演', type: '船体舞台', cover: '/images/b03-2.webp', images: seq('b03', 4), description: '船体舞台灯光预演。', source: '作品集 · 第 27 页' },
  { id: 'to-yanan', title: '到延安三千里', en: 'Three Thousand Li to Yan’an', category: 'theatre', label: '剧场作品', type: '舞台作品', cover: '/images/b05-1.webp', images: seq('b05', 4), source: '作品集 · 第 29 页' },
  { id: 'new-year', title: '过年', en: 'The New Year', category: 'theatre', label: '剧场作品', type: '舞台作品', cover: '/images/b06-4.webp', images: seq('b06', 4), source: '作品集 · 第 30 页' },
  { id: 'the-seagull', title: '海鸥', en: 'The Seagull', category: 'theatre', label: '剧场作品', type: '舞台作品', cover: '/images/b07-1.webp', images: seq('b07', 4), source: '作品集 · 第 31 页' },
  { id: 'rice-dream', title: '禾下乘凉梦', en: 'A Dream Beneath the Rice', category: 'theatre', label: '剧场作品', type: '舞台作品', cover: '/images/b08-1.webp', images: seq('b08', 4), source: '作品集 · 第 32 页' },
  { id: 'elephant-trunk-hill', title: '桂林象鼻山光影秀', en: 'Elephant Trunk Hill', category: 'lighting', label: '光影秀', type: '景观光影', cover: '/images/b09-1.webp', images: seq('b09', 4), source: '作品集 · 第 33 页' },
  { id: 'jingan-light-festival', title: '上海光影节', en: 'Shanghai Light Festival', category: 'lighting', label: '灯光设计图', type: '静安苹果分部广场灯光秀', cover: '/images/b10-1.webp', images: seq('b10', 4), description: '静安苹果分部广场灯光秀前期设计图。', source: '作品集 · 第 34 页' },
  { id: 'the-trojans', title: '特洛伊人', en: 'The Trojans', category: 'theatre', label: '剧场作品', type: '舞台作品', cover: '/images/b11-1.webp', images: seq('b11', 4), source: '作品集 · 第 35 页' },
];

projects.push(
  { id: 'stage-design-light-show', title: '舞美会议灯光秀', en: 'Stage Design Light Show', category: 'lighting', label: '设计与现场', type: '中国舞台美术学会 · 中央戏剧学院', cover: '/images/d03-2.webp', images: [...seq('d02', 3), ...seq('d03', 3), ...seq('d04', 3)], description: '中国舞台美术学会在中央戏剧学院举办的舞美会议灯光秀活动。作品集收录灯光效果与灯位图。', role: '方案设计、灯光预演与现场还原。', source: '作品集 · 第 8–10 页' },
  { id: 'mingdao-light-installation', title: '空间灯光装置', en: 'Light in Space', category: 'previsualization', label: '装置预演', type: '明道灯光 · 空间灯光装置', cover: '/images/d05-2.webp', images: [...seq('d05', 4), ...seq('d06', 1)], description: '空间灯光装置预演设计图制作，以 Unreal Engine 5 制作，使用 Photoshop 合成与修改。', role: '预演设计图制作。', tools: 'Unreal Engine 5 / Photoshop', source: '作品集 · 第 11–12 页' },
);

const justice = projects.find(p => p.id === 'victory-of-justice');
justice.role = '灯光设计组。';
justice.source = '作品集 · 第 3、24–26 页';
const trojans = projects.find(p => p.id === 'the-trojans');
trojans.description = '剧目微缩模型被国家大剧院舞美博物馆收藏。';
trojans.source = '作品集 · 第 3、35 页';
const star = projects.find(p => p.id === 'star-tide');
star.description += '设计模型于大同东南邑美术馆展出。';
star.source = '作品集 · 第 3、13–14 页';
projects.find(p => p.id === 'the-seagull').description = '中央戏剧学院与俄罗斯鲍里斯史楚金戏剧学院交流剧目。';
projects.find(p => p.id === 'to-yanan').description = '青年戏剧节优秀剧目音乐剧。';
projects.find(p => p.id === 'elephant-trunk-hill').role = '桂林艺术节象鼻山光影预案设计。';
projects.find(p => p.id === 'jingan-light-festival').role = '上海光影艺术节苹果商店前广场灯光秀预演设计。';

projects.push(
  { id: 'banquet-lighting', title: '宴会空间灯光', en: 'Banquet Space Lighting', category: 'lighting', label: '空间灯光', type: '宴会空间灯光方案', cover: '/images/b04-2.webp', images: seq('b04', 4), description: '空间灯光效果图，以及吊顶、地面和主舞台区域的灯光方案。', source: '作品集 · 第 28 页', caption: i => ['吊顶区域灯光', '空间灯光效果', '地面区域灯光', '主舞台区域灯光'][i] },
  { id: 'scenic-studies', title: '空间场景设计', en: 'Scenic Studies', category: 'previsualization', label: '场景设计', type: '三维场景设计图', cover: '/images/b12-4.webp', images: seq('b12', 4), source: '作品集 · 第 36 页' },
);

const restoredImages = { '/images/d03-1.webp': '/images/d03-1-full.webp', '/images/d04-3.webp': '/images/d04-3-full.webp' };
for (const project of projects) project.images = project.images.map(src => restoredImages[src] || src);
