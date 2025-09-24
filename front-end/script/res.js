
const umidade = document.getElementById("umidadevalor")
const umidadeX = document.getElementById("umidadeXvalor")
const temperatura = document.getElementById("tempvalor")
const temperaturaX= document.getElementById("tempXvalor")
const LDR = document.getElementById("LDRvalor")
const nivel = document.getElementById("nivelvalor")

const response = await(await(fetch(`https://greengarden-fd823-default-rtdb.firebaseio.com/.json`))).json()

umidade.innerHTML = response.MariaLemes.Monitoramento.Umidade + "%"
umidadeX.innerHTML = response.MariaLemes.Monitoramento.umidadeX + "%"
temperatura.innerHTML = response.MariaLemes.Monitoramento.Temperatura + "°"
temperaturaX.innerHTML = response.MariaLemes.Monitoramento.temperaturaX + "°"
LDR.innerHTML = response.MariaLemes.Monitoramento.Luminosidade + "%"
nivel.innerHTML = response.MariaLemes.Monitoramento.nivel + "%"
