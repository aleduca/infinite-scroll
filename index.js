const usersDiv = document.querySelector('#users');
const messageLoading = document.querySelector('#message');

async function getUsers() {
  try {
    const response = await fetch('http://localhost:8000?offset=' + document.querySelectorAll('li.li-list-users').length);
    return await response.json();
  } catch (error) {
   console.log(error) 
  }
}

async function load() {
  
  try {

    messageLoading.style = 'display:block';
    messageLoading.textContent = 'Loading Users';

    const users = await getUsers();

    if (!users.length) {
      messageLoading.style = "display:none";
      return;
    }

    if (!document.querySelector('#ul-list-users')) {
      const ul = document.createElement('ul');
      ul.id = "ul-list-users";
      usersDiv.append(ul);
    }

    users.forEach(user => {
      const li = document.createElement('li');
      li.classList.add("li-list-users");
      li.innerHTML = `${user.id} - ${user.firstName} ${user.lastName} <img  class="rounded-circle" width="35" style="border:solid 1px #efefef" height="30" src="${user.image}">`;
      document.querySelector("#ul-list-users").append(li);
    });

    messageLoading.style = 'display:none';

    function loadOnScrollEnd() {
      if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        load();
        window.removeEventListener('scroll', loadOnScrollEnd);
      }
    }

    window.addEventListener('scroll', loadOnScrollEnd);
  } catch (error) {
    console.log(error); 
  }

}

load();