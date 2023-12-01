function load_product(){
    let product=fetch('https://wsr-api.xn--80ahdri7a.site/products')
        .then(response=>response.json())
        .then(result=>{console.log(result);
        let count_products=result.content.products.length;
        let container=document.getElementById('container');
        for (let i=0; i<count_products; i++){
            let div=document.createElement('div');
            div.innerHTML=`            
                <h2>Наименование товара: ${result.content.products[i].name}</h2>
                <img src="http://wsr-api.xn--80ahdri7a.site/${result.content.products[i].image}" alt="image" class="product_image">
                <p>${result.content.products[i].discreption}</p>
                <p>Цена: ${result.content.products[i].price}</p>
                <p class='button' onclick="add_product(${result.content.products[i].id})">Добавить в корзину</p>
            </div>`;
            div.className='product';
        container.appendChild(div);
            }
        })}

   async function add_product(product){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer Gjsd14hgsdfd8opas89fdg/djsfg-klfjg1");
       myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            mode: 'cors'
        };

       await fetch("https://wsr-api.xn--80ahdri7a.site/chart/product/"+product, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                document.getElementsByClassName('background')[0].style.display='flex';
                let container=document.getElementById('message');
                let status=result.content.code;
                let content=``;
                switch (status){
                    case 200:
                         content=`<h1 class="title center_2">Сообщение</h1>
                        <p class="center_2">Товар добавлен в корзину</p>
                        <p class="button btn_message center_2" onclick="this.parentNode.parentNode.style.display='none'">Закрыть</p>`;
                        break;
                    case 401:
                          content=`<h1 class="title red center_2">Сообщение</h1>
                        <p class="center_2">Вы неавторизованы необходимо авторизовыться</p>
                        <p class="button btn_message center_2" onclick="this.parentNode.parentNode.style.display='none'">Закрыть</p>`;
                        break;
                }
                container.innerHTML=content;
            })
            .catch(error => console.log('error', error));
    }

    function form_create(){
        document.getElementsByClassName('background')[0].style.display='flex';
        let container=document.getElementById('message');
        let content=`
        <h1 class="center_2 title">Добавление товара</h1>
        <form id="form_create">
            <p class="center_0"><input type="text" name="name" placeholder="Название товара" class="input_item"></p>
            <p class="center_0 ">Выберите изображение товара <input type="file" name="image" class="input_item"></p>
            <p class="center_0"><input type="text" name="discreption" placeholder="Введите описание товара"class="input_item"></p>
            <p class="center_0"><input type="number" name="price" placeholder="Укажите цену товара"class="input_item"></p>
            <p id="error" class="red center_0"></p>
            <div class="button btn_message" onclick="create_product()">Создать товар</div>
        </form> 
        <div class="close" onclick="this.parentNode.parentNode.style.display='none'">&#10008;</div>
                    `;
        container.innerHTML=content;

    }

    function create_product(){

        let formdata=new FormData(document.getElementById('form_create'));
        let myHeaders=new Headers();
        myHeaders.append("Authorization", "Bearer Gjsd14hgsdfd8opas89fdg/djsfg-klfjg");


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://wsr-api.xn--80ahdri7a.site/product", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result);
                let code=result.content.code;
                let message='';
                switch (code) {
                    case 201:
                        location.reload(); //Обновить страницу
                        break;
                    case 401:
                        message='Вы не авторизовались, пройдите авторизацию';
                        document.getElementById('error').innerText=message;
                        break;
                    case  422:
                        let errors=result.content.errors.length;
                        for (let key in result.content.errors){ //Перебор свойств объекта
                            message+=(`<p>${key}: ${result.content.errors[key]}</p>`);
                        }
                        document.getElementById('error').innerHTML=message;
                }
            })
            .catch(error => console.log('error', error));
    }


