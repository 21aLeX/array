let arr = []
function sort (){
    if(arr == ''){
        alert('массив пуст!')
        document.getElementById('num').focus()
    }
    else{
        arr = bubbleSort(arr)

        let formData = new FormData()
        formData.append('arr', arr)
        let result = fetch('php.php', { method: 'POST', body: formData })
        .then(function (response) {
            return response.text()
        })
        .then(function (body) {
            let tr = document.createElement('tr')
            tr.innerHTML ='Результат:'+ arr+' Идентификатор:'+ body
            document.getElementById('result').append(tr)
        });
    }
}

function bubbleSort (a = []) {
    for(let i = 0; i< a.length; i++){
        for(let j=a.length-1; j > i; j--){
            if(a[j-1]>a[j]){
                [a[j-1],a[j]]=[a[j],a[j-1]]
            }
        }
    }

    return a
}

function addArray(){
    if(document.getElementById('num').value != '' && document.getElementById('num').value.length <=10){
        arr.push(Number(document.getElementById('num').value))
        if(document.getElementById('arr')){
            document.getElementById('arr').innerHTML ='Исходный массив:'+ arr
        }
        else{
            let div = document.createElement('div')
            div.innerHTML ='Исходный массив:'+ arr
            div.id = 'arr'
            document.getElementById('clean').after(div)
        }
    }
}

function clean(){
    arr = []
    document.getElementById('num').value = ''
    if(document.getElementById('arr')) {
        let el = document.getElementById('arr')
        el.remove()
    }
}

async function getArray(){
    let id = document.getElementById('id').value
    if (!id || id<=0){
        alert('введите правельный id!')
        document.getElementById('id').focus()
    }
    else{
        let formData = new FormData()
        formData.append('id', id)
        let result = fetch('php.php', { method: 'POST', body: formData })
        .then(function (response) {
            return response.text()
        })
        .then(function (body) {
            document.getElementById("out").innerHTML = body
        });
    }
}

fetch('php.php')
