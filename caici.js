// 从_keys.json随机选取一项
let randomKey = '';
let level = '';
let attri = '';
let field = '';
let type = '';
let eng = '';
let chn = '';
let isDigimon = false;
let isTouxiang = false;
let _cn_ens_j = null;
let _cn_ens_data = null;
let d_pics = null;
let d_pics_data = null;
let d_rs = null;
let d_rs_data = null;
let response = null;
let response_data = null;
let qian2dai = "0";

async function getRandomKey() {
    if(qian2dai === "1"){
        response = await fetch('qian2dai.json');
    }else if(qian2dai === "2") {
        response = await fetch('lidai.json');
    } else{
        response = await fetch('_keys.json');
    }
    _cn_ens_j = await fetch('_cn_en.json');
    _cn_ens_data = await _cn_ens_j.json();
    d_pics = await fetch('digimons_pics.json');
    d_pics_data = await d_pics.json();
    d_rs = await fetch('digimons_rs.json');
    d_rs_data = await d_rs.json();
    response_data = await response.json();
    const keys = response_data.keys;
    const randomIndex = Math.floor(Math.random() * keys.length);
    randomKey = keys[randomIndex];
    const digimon = await fetch('digimon_datas/'+randomKey+'.json');
    const digimon_data = await digimon.json();
    let digimon_datas = digimon_data[randomKey]
    level = digimon_datas.L;
    attri = digimon_datas.A;
    field = digimon_datas.F;
    type = digimon_datas.T;
    eng = digimon_datas.E;
    chn = digimon_datas.C;

    addLog("猜测记录：")
    // 用于调试
    console.log('随机数码兽:', randomKey);
    console.log('等级:', level);
    console.log('属性:', attri);
    console.log('适应领域:', field);
    console.log('类型:', type);
    console.log('数码兽英文:', eng);
    console.log('数码兽中文:', chn);
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    qian2dai = params.get('qian2dai');
    const q2dElement = document.getElementById('q2d');
    const lidaiElement = document.getElementById('lidai');
    if(qian2dai === "1" || qian2dai === null){
        q2dElement.textContent = '切换采用全部数码兽';
        lidaiElement.textContent = '切换仅采用历代主角团中的数码兽';
    }
    if(qian2dai === "0"){
        q2dElement.textContent = '切换仅采用前二代数码兽';
        lidaiElement.textContent = '切换仅采用历代主角团中的数码兽';
    }
    if(qian2dai === "2"){
        q2dElement.textContent = '切换仅采用前二代数码兽';
        lidaiElement.textContent = '切换采用全部数码兽';
    }
    getRandomKey();
};

function qiehuan(){
    const params = new URLSearchParams(window.location.search);
    let q2d = params.get('qian2dai');
    if(q2d === "1" || q2d === null){
        window.location.href = '?qian2dai=0'
    }
    if(q2d === "0"){
        window.location.href = '?qian2dai=1'
    }
    if(q2d === "2"){
        window.location.href = '?qian2dai=1'
    }
}

function qiehuan2(){
    const params = new URLSearchParams(window.location.search);
    let q2d = params.get('qian2dai');
    if(q2d === "1" || q2d === null){
        window.location.href = '?qian2dai=2'
    }
    if(q2d === "0"){
        window.location.href = '?qian2dai=2'
    }
    if(q2d === "2"){
        window.location.href = '?qian2dai=0'
    }
}

async function getGs(dataInput) {
    let cnEnsDatum = "";
    if(dataInput in _cn_ens_data){
        isDigimon = true;
        cnEnsDatum = _cn_ens_data[dataInput];
    }else if(response_data.keys.includes(dataInput.replace(" ","_").replace("-","_").replaceAll("[^a-zA-Z0-9_]","").replaceAll("__","_").toLowerCase())){
        isDigimon = true;
        cnEnsDatum = dataInput.replace(" ","_").replace("-","_").replaceAll("[^a-zA-Z0-9_]","").replaceAll("__","_").toLowerCase();
    } else {
        const resultElement = document.getElementById('result');
        resultElement.textContent = '数码兽名称有误！！';
        resultElement.style.color = "yellow";
        resultElement.style.fontSize = "24px";
        return;
    }
    const digimon = await fetch('digimon_datas/' + cnEnsDatum + '.json');
    const digimon_data = await digimon.json();
    let digimon_datas = digimon_data[cnEnsDatum]
    let g_level = digimon_datas.L;
    let g_attri = digimon_datas.A;
    let g_field = digimon_datas.F;
    let g_type = digimon_datas.T;
    let g_eng = digimon_datas.E;
    let g_chn = digimon_datas.C;
    addLog(g_chn + "(" + g_eng + ")" + ": " + g_level + "; " + g_attri + "; " + g_field + "; " + g_type)

    const levelElement = document.getElementById('level');
    const attriElement = document.getElementById('attri');
    const fieldElement = document.getElementById('field');
    const typeElement = document.getElementById('type');
    const ansElement = document.getElementById('ans');
    const eeElement = document.getElementById('ee');
    const hzElement = document.getElementById('hz');

    if(g_level === level) {
        levelElement.textContent = "等级：　　"+ level;
    }
    if(g_attri === attri) {
        attriElement.textContent = "属性：　　"+ attri;
    }
    if(g_field === field) {
        fieldElement.textContent = "适应领域："+field;
    }else{
        let fields = field.split("、");
        let gFields = g_field.split("、");
        let fs = fields.filter(value => gFields.includes(value));
        for(let i = 0; i < fs.length; i++) {
            if(!fieldElement.textContent.includes(fs[i])) {
                fieldElement.textContent += "、";
                fieldElement.textContent += fs[i];
            }
        }
        fieldElement.textContent = fieldElement.textContent.replace("适应领域：、","适应领域：")
    }
    if(g_type === type) {
        typeElement.textContent = "类型：　　"+type;
    }
    if(g_eng === eng || g_chn === chn) {
        ansElement.textContent = "答案：　　"+chn+"("+eng+")";
    }
    eeElement.textContent = "英语字母包含："+removeDuplicateLetters(getCommonLetters(g_eng.toLowerCase(),eng.toLowerCase()),eeElement.textContent.toLowerCase())
    hzElement.textContent = "中文汉字包含："+removeDuplicateLetters(getCommonLetters(g_chn,chn),hzElement.textContent)
    getXi(g_type, type);
    chulijieguo();
}

function getCommonLetters(str1, str2) {
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const common = [...set1].filter(letter => set2.has(letter));
    return common.join('');
}
function removeDuplicateLetters(str) {
    return [...new Set(str)].join('');
}

async function chulijieguo(){
    const userInput = document.getElementById('userInput').value;
    const resultElement = document.getElementById('result');
    if (isDigimon) {
        isDigimon = false;
        if (userInput === randomKey || userInput === eng || userInput === chn) {
            if(!isTouxiang) {
                resultElement.textContent = '回答正确！';
                resultElement.style.color = "green";
                resultElement.style.fontSize = "32px";
                tupian()
            }
        } else {
            resultElement.textContent = '回答错误，请再试一次！';
            document.getElementById('userInput').value = '';
            resultElement.style.color = "red";
            resultElement.style.fontSize = "24px";
        }
    }else {
        resultElement.textContent = '数码兽名称有误！！';
        resultElement.style.color = "yellow";
        resultElement.style.fontSize = "24px";
    }
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  // 防自动提交
    const userInput = document.getElementById('userInput').value;
    const wlenElement = document.getElementById('wlen');
    const resultElement = document.getElementById('result');
    const ansElement = document.getElementById('ans');

    if(chn.length === userInput.length) {
        wlenElement.textContent = "单词长度："+ chn.length;
    }

    if(userInput === "放弃" || userInput === "投降") {
        resultElement.textContent = '已放弃！！';
        resultElement.style.color = "orange";
        resultElement.style.fontSize = "24px";
        ansElement.textContent = "答案：　　"+chn+"("+eng+")";
        tupian()
        isTouxiang = true;
    }else if(!isTouxiang){
        getGs(userInput);
    }else {
        resultElement.textContent = '放弃后不可作答！';
    }
});

function abandon(){
    const resultElement = document.getElementById('result');
    const ansElement = document.getElementById('ans');

    resultElement.textContent = '已放弃！！';
    resultElement.style.color = "orange";
    resultElement.style.fontSize = "24px";
    ansElement.textContent = "答案：　　"+chn+"("+eng+")";
    tupian()
    isTouxiang = true;
}

function tupian() {
    const resultElement = document.getElementById('result');

    const img = document.createElement('img');
    let s1 = "";
    if(randomKey in d_pics_data) {
        s1 = d_pics_data[randomKey];
    }else {
        s1 = randomKey;
    }

    img.src = '/tupians/' + s1 + '.jpg';

    resultElement.insertAdjacentElement('afterend', img);
}
