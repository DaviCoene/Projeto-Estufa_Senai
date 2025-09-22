
const umidade = document.getElementById("umidadevalor")
const umidadeX = document.getElementById("umidadeXvalor")
const temperatura = document.getElementById("tempvalor")
const temperaturaX= document.getElementById("tempXvalor")
const LDR = document.getElementById("LDRvalor")
const nivel = document.getElementById("nivelvalor")

const response = await(await(fetch(`https://greengarden-fd823-default-rtdb.firebaseio.com/.json`))).json()

umidade.innerHTML = response.Darial.Monitoramento.umidade + "%"
umidadeX.innerHTML = response.Darial.Monitoramento.umidadeX + "%"
temperatura.innerHTML = response.Darial.Monitoramento.temperatura + "°"
temperaturaX.innerHTML = response.Darial.Monitoramento.temperaturaX + "°"
LDR.innerHTML = response.Darial.Monitoramento.LDR + "%"
nivel.innerHTML = response.Darial.Monitoramento.nivel + "%"
