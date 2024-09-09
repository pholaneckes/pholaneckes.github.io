const shouXi = ["兽型", "幻兽型", "珍兽型", "海兽型", "水栖哺乳类型", "水栖兽人型", "魔兽型", "妖兽型", "兽人型", "圣兽型", "神兽型", "兽骑士型", "古代兽型", "古代幻兽型", "古代水栖兽人型"]
const niaoXi = ["小鸟型", "雏鸟型", "鸟型", "巨鸟型", "鸟人型", "圣鸟型", "妖鸟型", "古代鸟型", "古代鸟人型"]
const yuJiaqiaoXi = ["热带鱼型", "甲壳类型", "古代鱼型", "古代甲壳类型"]
const kuncongXi = ["幼虫型", "昆虫型", "古代昆虫型"]
const zhiwuXi = ["种子型", "球根型", "植物型", "食虫植物型", "古代植物型"]
const jixieXi = ["机械型", "改造型", "机雷型"]
const ziranXi = ["烟雾型", "冰雪型", "火焰型", "矿石型", "矿物型", "古代矿物型"]
const renxingXi = ["外星人型", "魔人型", "鬼人型", "海人型", "爬人型", "神人型", "僧侣型", "如来型", "战士型", "魔法战士型", "圣骑士型", "古代圣骑士型", "黑暗骑士型", "魔法骑士型"]
const longXi = ["幼龙型", "小龙型", "龙型", "恐龙型", "角龙型", "剑龙型", "铠龙型", "翼龙型", "海龙型", "地龙型", "天龙型", "岩龙型", "机龙型", "兽龙型", "长颈龙型", "幻龙型", "邪龙型", "魔龙型", "火焰龙型", "鸟龙型", "光龙型", "龙人型", "龙战士型", "圣龙型", "古代龙型", "古代龙人型"]
const youlinYaojingXi = ["精灵型", "幽灵型", "不死型", "妖精型", "古代妖精型"]
const emoXi = ["小恶魔型", "堕天使型", "魔王型", "魔神型"]
const tianshiXi = ["小天使型", "天使型", "大天使型", "权天使型", "能天使型", "力天使型", "主天使型", "座天使型", "智天使型", "炽天使型"]
const qitaXi = ["两栖类型", "爬虫类型", "哺乳类型", "水栖型", "软体型", "突然变异型", "古代突然变异型", "合成型", "寄生型", "玩偶型", "完美型", "古代型", "入侵型", "小型", "软泥型", "食物型", "二流型", "主流型", "超主流型", "乐器型", "布朗型", "液晶薄型", "武器型", "防具型", "圣剑型", "银河型", "强化型", "特异型", "化生型", "邪神型", "恶魔龙型", "种族不明", "不明", "NO", "DATA", "解析不能", "9000型"]

const Xis = [shouXi,niaoXi,yuJiaqiaoXi,kuncongXi,zhiwuXi,jixieXi,ziranXi,renxingXi,longXi,youlinYaojingXi,emoXi,tianshiXi,qitaXi]
const XisC = ["兽系","鸟系","鱼甲壳系","昆虫系","植物系","机械系","人形系","龙系","幽灵妖精系","恶魔系","天使系","其他系"]

async function getXi(g_type,type){
    const xiElement = document.getElementById('xi');
    let t1 =true;
    let t2 =true;
    for(let i = 0; i < Xis.length; i++){
        for (let j = 0; j < Xis[i].length; j++) {
            if (Xis[i][j].includes(g_type)) {
                t1 = false;
            }
            if (Xis[i][j].includes(type)) {
                t2 = false;
            }
            if (Xis[i][j].includes(g_type) && Xis[i][j].includes(type)) {
                xiElement.textContent = "分类系：　" + XisC[i];
            }
        }
    }
    if(t1 && t2){
        xiElement.textContent = "分类系：　未定义";
    }
}