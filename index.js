const colorGridSec = document.getElementById("color-grid-sec")
const chooseColorBtn = document.getElementById("choose-color-btn")
const colorInput = document.getElementById("color-input")
const colorMode =document.getElementById("color-select-box")
const copyMessage = document.getElementById("copy-message")
copyMessage.style.display = "none"


const giveColor=(data)=>{
let html =""
    for(let color of data){
html += `
<div class="color-name-pair">
<div class="color-palatte" data-color="${color.hex.value}" style="background-color:${color.hex.value}"></div>
<p class="color-number" data-num="${color.hex.value}">${color.hex.value}</p>
</div>
`
    }
    colorGridSec.innerHTML = html


}

const getColorSchemes =()=>{
    const colorInputWithoutHash = colorInput.value.slice(1)
console.log(colorInputWithoutHash)
console.log(colorMode.value)
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInputWithoutHash}&mode=${colorMode.value}&count=8`)
    .then(res =>res.json())
    .then(data =>{
        console.log(data)
        console.log(data.colors[0].rgb.value)
        console.log()
       giveColor(data.colors)
    }).catch(error=>{
        console.error("error shown",error)
    })
}

const copyHexValue =(item) =>{
navigator.clipboard.writeText(item).then(() =>{
    copyMessage.style.display = "flex"
    copyMessage.innerText = `Hex value ${item} Copied`
    setTimeout(()=>{
        copyMessage.style.display = "none"
    },1000)
})
}

document.addEventListener("click",(e)=>{
    if(e.target.id == "choose-color-btn"){
        getColorSchemes()
    }else if(e.target.dataset.color){
        copyHexValue(e.target.dataset.color)
    }else if(e.target.dataset.num){
        copyHexValue(e.target.dataset.num)
    }
})



