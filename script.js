const divDataHoje = document.getElementById("data-hoje");
const divDataFinal = document.getElementById("data-final");
const botaoCalcular = document.getElementById("calcular");
const divResultadoDias = document.getElementById("dias");
const divData = document.getElementById("data");

const hoje = new Date();
const isoDate = hoje.toISOString().split('T')[0];
divDataHoje.append(hoje.toLocaleDateString());
divDataFinal.setAttribute("min",isoDate);
const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

botaoCalcular.addEventListener('click', function(){
    const dataFinal = divDataFinal.value;
    if(verificaCampos(dataFinal) != false){
        calculaDias(dataFinal);
    }
})

function calculaDias(dataFinal){
    resultado.style.display = "block";
    const [ano, mes, dia] = dataFinal.split('-').map(Number);
    const diaDoAnoHoje = getDayOfYear(hoje);
    const diaDoAnoFinal = getDayOfYear(new Date(ano, mes - 1, dia));
    const nomeMes = retornaNomeMes(mes);
    let diferenca = 0;
    if(!isSameYear(hoje.getFullYear(), ano)){
        const diferencaAnos = calculaDiferencaAnos(hoje.getFullYear(), ano);
        const arrayAnos = retornaArrayAnos(diferencaAnos, hoje.getFullYear());
        const bissextos = calculaBissextos(arrayAnos);
        const adicaoAnos = (bissextos * 366) + ((diferencaAnos-bissextos)*365);
        diferenca = diaDoAnoFinal - diaDoAnoHoje + adicaoAnos;

    }else{
        diferenca = diaDoAnoFinal - diaDoAnoHoje;
    }
    divResultadoDias.textContent = `${diferenca}`;
    divData.textContent = `dias para ${dia} de ${nomeMes} de ${ano}`;
}
function verificaCampos(dataFinal){
    if(dataFinal == ""){
        alert("É necessário inserir data");
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