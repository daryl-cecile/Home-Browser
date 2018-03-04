/**
 * Created by WebStorm.
 * User: darylcecile
 * Date: 28/02/2018
 * Time: 16:33
 * License: MIT
 */

console.log('runnong');
let imageTag = document.createElement('img');
imageTag.crossOrigin = "Anonymous";
imageTag.onload = ()=>{
    document.body.setAttribute(`style`,`background:url('${imageTag.src}')`);
    let colorThief = new ColorThief();
    let c = colorThief.getColor( imageTag );
    console.log(c);
    document.querySelector('meta[name="theme-color"]').setAttribute('content',`rgb(${c.join(',')})`);
};
imageTag.onerror = ()=>{
    imageTag.src = "https://source.unsplash.com/random/1280x800?nature,home&sig="+Math.floor((Math.random()*9999)+10);
};
imageTag.src = "https://source.unsplash.com/random/1280x800?nature,home";