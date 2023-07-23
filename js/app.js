const search_p=document.querySelector("#search");
const home_page=document.querySelector("#home");
const home_page_users=document.querySelector(".home-page #user .row");
const header=document.querySelector("header");
const main=document.querySelector("main");



let first_users;
get_ajax('https://jsonplaceholder.typicode.com/users',function(obj){
    first_users=obj;
})
get_ajax('https://jsonplaceholder.typicode.com/posts',function(obj){
    obj.map(show_posts);
})
get_ajax('https://jsonplaceholder.typicode.com/users',function(obj){
    obj.map(show_users);
})

// setTimeout(function(){
    // search.addEventListener('keyup',function(){
        // const cardInHome=document.querySelectorAll(".user-card");
        // console.log(search);
        // for(var i=0;i<strings.length;i++){
        //     if(!strings[i].toLowerCase().trim().startsWith(search.value.toLowerCase().trim())){
        //         // console.log(search.value);
        //         document.querySelector(`.li-${i}`).style.display="none";
        //     }
        // }
    // });
// },1000)

function get_ajax(url,ajax_fa){ 
    let xhr= new XMLHttpRequest();

    xhr.onreadystatechange=function(){
        if(xhr.status==200 && xhr.readyState==4){
            const obj=JSON.parse(xhr.response);
            ajax_fa(obj);
        }
    };
    
    xhr.open('GET',url);
    xhr.send();
}
function show_users(item){ //show users in home page
    home_page_users.innerHTML+=`<div class="col-sm-12">
                                    <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                        <p class="card-text">${item.email} <br>  <i class="fa-solid fa-location-dot"></i>  ${item.address.city}</p>
                    
                                        <a href="./html/user.html?id=${item.id}" class="btn btn-primary">see profile</a>
                                    </div>
                                    </div>
                                </div>`
}
function show_posts(item){ //show users in home page
    home_page.innerHTML+=      `<div class="user-card">
                                    <div class="user-card_left">
                                        <a href="./html/user.html?id=${item.userId}" class="fa-solid fa-user-circle" id="cr1"></a>
                                        <div class="v-line"></div>
                                        <i class="fa-solid fa-user-circle" id="cr2"></i>
                                    </div>
                                    <div class="user-card_body">
                                        <div class="user-card_body--id">
                                            <a href="./html/user.html?id=${item.userId}" class="h-4--b">${user_information(item.userId,'name')}</a>
                                            <h2 class="h-5--blue">${user_information(item.userId,'username')}</h2>
                                        </div>
                                        <div class="user-card_body--content">
                                            <h4 class="h-4--b">${item.title}</h4>
                                            <p>${item.title}</p>
                                        </div>
                                    </div>
                                </div>`
}

function user_information(uid,inf,obj=first_users){   //inter name/username/email
        for(let i=0;i<obj.length;i++){
            if(obj[i].id==uid && inf=='name'){
                return obj[i].name;
            }
            else if(obj[i].id==uid && inf=='username'){
                return obj[i].username;
            }
            else if(obj[i].id==uid && inf=='email'){
                return obj[i].email;
            }
            else if(obj[i].id==uid && inf=='companyName'){
                return obj[i].company.name;
            }
            else if(obj[i].id==uid && inf=='companyDis'){
                return obj[i].company.catchPhrase;
            }
        };
}

// _______________________________________________________________user page
const prsInfo=document.querySelector('.user_personal-inf');
const posts_box=document.querySelector('.user-page .tab-content #posts');
const address_box=document.querySelector('.user-page .tab-content #address');
const contact_box=document.querySelector('.user-page .tab-content #contact');


const urlParams = new URLSearchParams(location.search).get('id');

get_ajax('https://jsonplaceholder.typicode.com/users',function(obj){
    // console.log(posts_box);
    prsInfo.innerHTML=`     <h2 class="h-2">${user_information(urlParams,'name',obj)}</h2>
                            <h4 class="h-4--light">${user_information(urlParams,'email',obj)}</h4>
                            <div class="company">
                                <i class="fa-solid fa-building h-4--light"></i>
                                <span class="h-4--light">${user_information(urlParams,'companyName',obj)}</span>
                                <span class="h-5--light"> | ${user_information(urlParams,'companyDis',obj)}</span>
                            </div>`
})

get_ajax(`https://jsonplaceholder.typicode.com/user/${urlParams}/posts`,function(obj){
    obj.map(function(item){
        posts_box.innerHTML+=`  <div class="postOfUser">
                                    <div class="post-top">
                                        <i class="fa-solid fa-user-circle" id="prifile_cr"></i>
                                        <span class="h-4--b">${user_information(urlParams,'name')}</span>
                                    </div>  
                                    <div class="post-body">
                                        <div class="post-body--title h-4--b">${item.title}</div>
                                        <p class="post-body--content">${item.body}</p>
                                    </div>
                                    <div class="post-footer">
                                        <i class="fa-solid fa-thumbs-up"></i>
                                        <a href="./post.html?id=${item.id}&userid=${item.userId}" class="fa-regular fa-comment"></a>
                                        <i class="fa-solid fa-share"></i>
                                    </div>
                                </div>`
    })
})
// _____________________________________________post page
const comment_box=document.querySelector('.post-page .comment-main');
const postOwner=document.querySelector('.post-page .post-header span');

const urlPostID = new URLSearchParams(location.search).get('id');
const urlOwnerID = new URLSearchParams(location.search).get('userid');

get_ajax('https://jsonplaceholder.typicode.com/users',function(obj){
    postOwner.innerHTML=`${user_information(urlOwnerID,'name',obj)}`;
})
get_ajax(`https://jsonplaceholder.typicode.com/posts/${urlPostID}/comments`,function(obj){
    obj.map(function(item){
        comment_box.innerHTML+=` <div class="comment-of-post">
                                    <div class="comment-left">
                                        <i class="fa-solid fa-user-circle" id="prifile_cr"></i>
                                    </div>
                                    <div class="comment-right">
                                        <div class="comment_user h-4--b">${item.email}</div>
                                        <div class="comment_body">${item.body}</div>
                                    </div>
                                </div>`
    })
})