const divDataInicio = document.getElementById("data-inicio");
const divDataFinal = document.getElementById("data-final");
const botaoCalcular = document.getElementById("calcular");
const divResultadoDias = document.getElementById("dias");
const divDatas = document.getElementById("datas");

const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

botaoCalcular.addEventListener('click', function(){
    const dataInicio = divDataInicio.value;
    const dataFinal = divDataFinal.value;
    if(verificaCampos(dataInicio, dataFinal) != false){
        calculaDias(dataInicio, dataFinal);
    }
    
})

function calculaDias(dataInicio, dataFinal){
    resultado.style.display = "block";
    const [anoInicio, mesInicio, diaInicio] = dataInicio.split('-').map(Number);
    const [anoFinal, mesFinal, diaFinal] = dataFinal.split('-').map(Number);
    const diaDoAnoInicio = getDayOfYear(new Date(anoInicio, mesInicio - 1, diaInicio));
    const diaDoAnoFinal = getDayOfYear(new Date(anoFinal, mesFinal - 1, diaFinal));
    const nomeMesInicio = retornaNomeMes(mesInicio);
    const nomeMesFinal = retornaNomeMes(mesFinal);
    let diferenca = 0;
    if(!isSameYear(anoInicio, anoFinal)){
        const diferencaAnos = calculaDiferencaAnos(anoInicio, anoFinal);
        const arrayAnos = retornaArrayAnos(diferencaAnos, anoInicio);
        const bissextos = calculaBissextos(arrayAnos);
        const adicaoAnos = (bissextos * 366) + ((diferencaAnos-bissextos)*365);
        diferenca = diaDoAnoFinal - diaDoAnoInicio + adicaoAnos;

    }else{
        diferenca = diaDoAnoFinal - diaDoAnoInicio;
    }
    if(diferenca < 0){
        diferenca = Math.abs(diferenca);
    }
    divResultadoDias.textContent = `${diferenca}`;
    divDatas.textContent = `dias entre ${diaInicio} de ${nomeMesInicio} de ${anoInicio} e ${diaFinal} de ${nomeMesFinal} de ${anoFinal}`;
}
function verificaCampos(dataInicio, dataFinal){
    if(dataInicio == "" || dataFinal == ""){
        alert("É necessário inserir datas");
        return false;
    }
}
function retornaNomeMes(mes){
    const nomeMes = meses[mes-1];
    return nomeMes;
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function isSameYear(anoAtual, anoFinal){
    if(anoFinal - anoAtual === 0){
        return true
    }
    else{
        return false;
    }
}

function calculaDiferencaAnos(anoAtual, anoFinal){
    const diferencaAnos = anoFinal - anoAtual;
    return diferencaAnos;
}

function retornaArrayAnos(diferencaAnos, anoAtual){
    let anos = [];
    for(let ano = 0; ano < diferencaAnos; ano++){
        anos.push(anoAtual+ano);
    }
    return anos;
}

function calculaBissextos(anos){
    let anosBissextos = 0;
    anos.forEach(ano => {
        if(ano % 4 === 0){
            anosBissextos++;
        }
    });
    return anosBissextos;
}