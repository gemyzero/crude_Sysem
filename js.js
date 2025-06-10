let titileEle = document.getElementById('titile');
let priceEle = document.getElementById('price');
let taxesEle = document.getElementById('taxes');
let adsEle = document.getElementById('ads');
let discountEle = document.getElementById('discount');
let totalEle = document.getElementById('total');
let delateEle = document.getElementById('delate');
let createProduct = document.getElementById('create');
let categoryEle = document.getElementById('category');
let countEle = document.getElementById('count');
let mode = 'create';
let tmb ;

 
//  getTotal 
function getTotal(){
console.log('done ')
if(priceEle.value  !== '' ){

    let result = (+priceEle.value + +taxesEle.value + +adsEle.value - +discountEle.value);
    totalEle.innerHTML = ` ${result}`;
    totalEle.style.background = 'green'
   }else if(priceEle.value  == '') {
    totalEle.innerHTML = ' 0';
    totalEle.style.background = 'black'
 }

}
 

 
let datapro = [];
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    let datapro = [];
}

// create product
createProduct.onclick = function(){
    let product = {
        titile:titileEle.value,
        price:priceEle.value,
        ads:adsEle.value,
        discount:discountEle.value,
        totalEle:totalEle.innerHTML,
        category:categoryEle.value,
        count:countEle.value,
        taxes:taxesEle.value,
    }

if(mode === 'create'){
    if(product.count > 1){
        for(let i = 0; i < product.count; i++){
            datapro.push(product)
           showData();

        }
    }else{
        datapro.push(product);
        showData();
    }
}else{
     datapro[tmb] = product;
     mode = 'create'
     createProduct.innerHTML = 'create';
     countEle.style.display = 'block'


}

 // localStorage مبتخدش غير استرينج
    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(datapro)
    clearData()
    showData();
}

 // clearData
function clearData(){
    titileEle.value = '';
    priceEle.value = '';
    adsEle.value = '';
    totalEle.innerHTML = '';
    categoryEle.value = '';
    countEle.value = '';
    taxesEle.value = '';
    discountEle.value = '';
}
 // showData 
function showData(){
    getTotal();
    let table = '';

    for(let i = 0; i < datapro.length;i++){
        table +=`
          <tr>
      <td>${i}</td>
      <td>${datapro[i].titile}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].totalEle}</td>
      <td>${datapro[i].category}</td>
      <td>    <button onclick='updateData(${i})' class=" btn btn-primary" id="delate">update</button></td>
      <td>    <button onclick='delateEl(${i})'  class="btn btn-danger"  id="delate">delate</button></td> 

  </tr>
        
        `
    } 

let tbody =     document.getElementById('tbody');
      tbody.innerHTML= table;
    
      let dealatAllData = document.getElementById('delateAll')
      if(datapro.length > 0){
        dealatAllData.innerHTML = `
         <button  class="form-control py-2 my-1 bg-danger" id="delate" onclick="dealatAllDate()"> delate all (${datapro.length})</button>
         `
      }else{
        dealatAllData.innerHTML = ''
      }
}

// 
function delateEl(i){

    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData();

}

function dealatAllDate (){
    datapro.splice(0)
    localStorage.clear();
    showData();
}
function updateData(i){

    titileEle.value = datapro[i].titile;
    priceEle.value = datapro[i].price;
    adsEle.value = datapro[i].ads;
    taxesEle.value = datapro[i].taxes;
    discountEle.value = datapro[i].discount;
    getTotal();
    countEle.style.display='none'
    categoryEle.value = datapro[i].category;
    createProduct.innerHTML = 'Update'
     mode = 'update'
     tmb = i;
}

                                // getSearshMode
let searchMode= 'titile';
function getSearshMode(id){

    var searchEle = document.getElementById('search');

    if( id == 'sershTitile'){
         searchMode= 'titile';

    }else {
         searchMode= 'category';

 }

 searchEle.placeholder=`Sersh by ${searchMode}`;

    console.log(searchMode)
    searchEle.focus();
    searchEle.value = '';
}
                                 //searchData
function searchData(value){
    let table = '';

 if(searchMode == 'titile'){
    
for(let i= 0 ; i < datapro.length;i++){
    let result = (+priceEle.value + +taxesEle.value + +adsEle.value - +discountEle.value);

    if(datapro[i].titile.includes(value.toLowerCase())){
 
        table +=`
        <tr>
    <td>${i}</td>
    <td>${datapro[i].titile}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${result}</td>
    <td>${datapro[i].category}</td>
    <td>    <button onclick='updateData(${i})' class=" btn btn-primary" id="delate">update</button></td>
    <td>    <button onclick='delateEl(${i})'  class="btn btn-danger"  id="delate">update</button></td> 

</tr>
      
      `
    }


}


 }else{
    for(let i= 0 ; i < datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
     
            table +=`
            <tr>
        <td>${i}</td>
        <td>${datapro[i].titile}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].totalEle}</td>
        <td>${datapro[i].category}</td>
        <td>    <button onclick='updateData(${i})' class=" btn btn-primary" id="delate">update</button></td>
        <td>    <button onclick='delateEl(${i})'  class="btn btn-danger"  id="delate">update</button></td> 
    
    </tr>
          
          `
        }
    
    
    }
 }
 let tbody =     document.getElementById('tbody');
 tbody.innerHTML= table;

}
   

showData();