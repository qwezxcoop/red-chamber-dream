
// data.js - Now updated with colors from the 色谱.html
export const characters = [
  // 1. 林黛玉
  {
    name: "林黛玉",
    scenes: [
      {
        symbol: "竹",
        poem: "潇湘妃子",
        description: "凤尾森森，龙吟细细，一片翠竹环绕。",
        color: "#96C8C8", // 天青色
        transitionType: "flowerPetals",
        fateSymbol: false,
      },
      {
        symbol: "花冢",
        poem: "葬花吟",
        description: "花谢花飞花满天，红消香断有谁怜？",
        color: "#D94A64", // A color from the petal scene in DAIYU1.1.html
        transitionType: "flowerPetals",
        fateSymbol: true,
      },
    ],
  },
  // 2. 薛宝钗
  {
    name: "薛宝钗",
    scenes: [
      {
        symbol: "金锁",
        poem: "蘅芜君",
        description: "不离不弃，芳龄永继。",
        color: "#E4D0A9", // 蜜合色
        transitionType: "default",
        fateSymbol: false,
      },
      {
        symbol: "雪",
        poem: "金簪雪里埋",
        description: "山中高士晶莹雪，世外仙姝寂寞林。",
        color: "#FCFCFC", // 雪白
        transitionType: "snow",
        fateSymbol: true,
      },
    ],
  },
  // 3. 贾元春
  {
    name: "贾元春",
    scenes: [
        {
            symbol: "石榴",
            poem: "贵妃省亲",
            description: "榴花开处照宫闱，石榴多子福气多。",
            color: "#C8323C", // 石榴红
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "弓",
            poem: "虎兕相逢大梦归",
            description: "二十年来辨是非，榴花开处照宫闱。三春争及初春景，虎兕相逢大梦归。",
            color: "#795548",
            transitionType: "shatter",
            fateSymbol: true,
        }
    ]
  },
  // 4. 贾探春
  {
    name: "贾探春",
    scenes: [
        {
            symbol: "风筝",
            poem: "才自精明志自高",
            description: "才自精明志自高，生于末世运偏消。清明涕送江边望，千里东风一梦遥。",
            color: "#D94A64", // 玫瑰色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "船",
            poem: "分骨肉",
            description: "一帆风雨路三千，把骨肉家园齐来抛闪。恐哭损残年，告爹娘，休把儿悬念。",
            color: "#00BCD4",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 5. 史湘云
  {
    name: "史湘云",
    scenes: [
        {
            symbol: "海棠",
            poem: "憨湘云醉眠芍药裀",
            description: "酣梦沉沉，芍药茵中，香梦沉酣。",
            color: "#F08080", // 海棠红
            transitionType: "flowerPetals",
            fateSymbol: false,
        },
        {
            symbol: "云",
            poem: "乐中悲",
            description: "襁褓中，父母叹双亡。纵居那绮罗丛，谁知娇养？幸生来，英豪阔大宽宏量，从未将儿女私情略萦心上。",
            color: "#90A4AE",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 6. 妙玉
  {
    name: "妙玉",
    scenes: [
        {
            symbol: "梅",
            poem: "栊翠庵",
            description: "气质美如兰，才华馥比仙。天生成孤癖人皆罕。",
            color: "#FCFCFC", // 雪白
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "泥",
            poem: "世难容",
            description: "欲洁何曾洁，云空未必空。可怜金玉质，终陷淖泥中。",
            color: "#795548",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 7. 贾迎春
  {
    name: "贾迎春",
    scenes: [
        {
            symbol: "木偶",
            poem: "二木头",
            description: "子系中山狼，得志便猖狂。金闺花柳质，一载赴黄粱。",
            color: "#A9A57C", // 秋香色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "狼",
            poem: "中山狼",
            description: "身后有余忘缩手，眼前无路想回头。",
            color: "#607D8B",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 8. 贾惜春
  {
    name: "贾惜春",
    scenes: [
        {
            symbol: "画",
            poem: "画梁春尽落香尘",
            description: "勘破三春景不长，缁衣顿改昔年妆。可怜绣户侯门女，独卧青灯古佛旁。",
            color: "#778899", // 烟灰色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "佛",
            poem: "虚花悟",
            description: "将那三春看破，桃红柳绿待如何？把这韶华打灭，觅那清淡天和。",
            color: "#673AB7",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 9. 王熙凤
  {
    name: "王熙凤",
    scenes: [
        {
            symbol: "凤",
            poem: "凤姐",
            description: "凡鸟偏从末世来，都知爱慕此生才。",
            color: "#DC143C", // 大红色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "冰",
            poem: "聪明累",
            description: "机关算尽太聪明，反算了卿卿性命。生前心已碎，死后性空灵。",
            color: "#B3E5FC",
            transitionType: "shatter",
            fateSymbol: true,
        }
    ]
  },
  // 10. 巧姐
  {
    name: "巧姐",
    scenes: [
        {
            symbol: "纺车",
            poem: "留余庆",
            description: "势败休云贵，家亡莫论亲。偶因济刘氏，巧得遇恩人。",
            color: "#2E4374", // 靛蓝色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "村庄",
            poem: "晚年安",
            description: "择膏粱，谁承望流落在烟花巷！",
            color: "#A1887F",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 11. 李纨
  {
    name: "李纨",
    scenes: [
        {
            symbol: "兰",
            poem: "晚韶华",
            description: "桃李春风结子完，到头谁似一盆兰。如冰水好空相妒，枉与他人作笑谈。",
            color: "#AEC3B0", // 淡竹青
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "墓",
            poem: "镜中花",
            description: "镜里恩情，更那堪梦里功名！那美韶华去之何讯！再休提绣帐鸳衾。",
            color: "#BDBDBD",
            transitionType: "default",
            fateSymbol: true,
        }
    ]
  },
  // 12. 秦可卿
  {
    name: "秦可卿",
    scenes: [
        {
            symbol: "梦",
            poem: "兼美",
            description: "鲜艳妩媚，有似乎宝钗，风流袅娜，则又如黛玉。",
            color: "#C3B1C8", // 烟霞色
            transitionType: "default",
            fateSymbol: false,
        },
        {
            symbol: "楼",
            poem: "好事终",
            description: "画梁春尽落香尘。擅风情，秉月貌，便是败家的根本。",
            color: "#4527A0",
            transitionType: "shatter",
            fateSymbol: true,
        }
    ]
  }
];
